/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Spin, Badge, Modal } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Autoplay } from "swiper/modules";
import { useState } from "react";
import { useGetAllProductsQuery } from "../../redux/features/product/productApi";
import { TQueryParam } from "../../types/global.type";
// import "./NewBestSelling.css";
import bgCard from "./../../assets/images/Light bg frame.png";
import { Link } from "react-router-dom";
import Meta from "antd/es/card/Meta";
import { TProduct } from "../../types/product.type";

const KidProducts = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [edCard, setedCard] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const { data: productsData, isLoading } = useGetAllProductsQuery([
    { name: "sort", value: "-price" },
    { name: "category", value: "kid" },
    ...params,
  ]);

  console.log(setParams);
  const openModal = (product: any) => {
    setSelectedProduct(product);

    setIsModalOpen(true);
  };

  const handleMouseEnter = (index: number) => {
    setedCard(index);
  };

  const handleMouseLeave = () => {
    setedCard(null);
  };

  const handleClickToView = (product: TProduct) => {
    openModal(product);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="md:container mx-auto ">
      <div className="flex align-center  gap-5 items-center">
        <h2 className="mt-20 border-black border-l-2 border-t-2 h-10 w-full"></h2>
        <h2 className="pt-10 flex justify-center items-center text-primary w-[650px]  md:lg:w-[500px] font-semibold md:text-[15px] text-[12px]">
          KID'S COLLECTION
        </h2>
        <h2 className="mt-20  border-black w-full border-t-2 border-r-2 h-10"></h2>
      </div>
      <Spin spinning={isLoading}>
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={10}
          slidesPerView={4}
          autoplay={{ delay: 5000 }}
          navigation={true}
          pagination={{ clickable: true, el: ".swiper-pagination" }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 15,
            },
          }}
        >
          {productsData?.data?.map((product, index) => (
            <SwiperSlide key={index}>
              <Badge.Ribbon
                placement="start"
                text={
                  product.discount !== 0 ? `discount${product.discount}%` : ""
                }
                color="#F50600"
              >
                <div
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  className="relative bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${bgCard})` }}
                >
                  <Card
                    key={product?._id}
                    className="w-[300px] h-[380px]"
                    cover={
                      <img
                        alt="example"
                        src={product?.images[0]}
                        loading="lazy"
                        className="w-full h-full object-cover rounded-t-md"
                      />
                    }
                  >
                    <Meta
                      title={
                        <h4 className="text-black capitalize text-textprimary text-center">
                          {product.name}
                        </h4>
                      }
                    />
                    <div className="flex flex-wrap justify-center items-center mt-2 gap-1">
                      {product?.sizeStok?.map((item) => (
                        <div
                          key={item.size}
                          className={`flex justify-center items-center px-3 py-0.5 border divide-x-4 border-gray-300 ${
                            item?.stock === 0
                              ? "text-textprimary rounded-[4px] font-semibold line-through "
                              : "text-textsecoundary rounded-[4px] font-semibold"
                          }`}
                          style={{ textDecorationThickness: "2px" }}
                        >
                          size/{item.size}
                        </div>
                      ))}
                    </div>

                    <div className="my-5">
                      {product.discount === 0 ? (
                        <p className="text-secondary text-[18px] font-semibold">
                          Price: {product.price}৳
                        </p>
                      ) : (
                        <div className="flex container mx-auto justify-center items-center gap-4 max-w-[100px]">
                          <h5 className="text-textprimary text-[20px] font-semibold line-through">
                            {product?.price}৳
                          </h5>

                          {product?.discount && (
                            <h5 className="text-secondary text-[18px] font-semibold">
                              {product?.price -
                                (product?.price * product?.discount) / 100}
                              ৳
                            </h5>
                          )}
                        </div>
                      )}
                    </div>

                    {edCard === index && (
                      <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-black">
                        <button
                          className="text-white bg-black text-xs :bg-gray-500  :text-white font-bold py-2 px-4 rounded-md transition duration-500 transform :scale-110"
                          onClick={() => handleClickToView(product)}
                        >
                          Click to view
                        </button>
                      </div>
                    )}
                    {edCard === index && (
                      <div className="absolute bottom-1 left-5 right-5 flex items-center justify-center bg-opacity-50 ">
                        <Link
                          to={`/product/${product._id}`}
                          className="text-white bg-red-600 text-xs :bg-gray-700 :text-white font-bold py-3 px-8 w-full rounded-md transition duration-500 transform :scale-110"
                        >
                          <button>Buy Now</button>
                        </Link>
                      </div>
                    )}
                  </Card>
                </div>
              </Badge.Ribbon>
            </SwiperSlide>
          ))}
        </Swiper>
      </Spin>

      <Modal
        title="Product Details"
        visible={isModalOpen}
        onCancel={closeModal}
        footer={null}
      >
        {selectedProduct && (
          <>
            <div>
              <img src={selectedProduct?.images[0]} alt="" />
            </div>
            <p className="text-red-700 font-semibold">{selectedProduct.name}</p>
            <p>{selectedProduct.description}</p>
            <p className="font-semibold">
              Price:
              <span className="text-red-700 font-bold">
                {selectedProduct.price}৳
              </span>
            </p>
          </>
        )}
      </Modal>

      <h2 className="mb-20 border-black w-full h-10 border-l-2 border-b-2 border-r-2"></h2>
    </div>
  );
};

export default KidProducts;
