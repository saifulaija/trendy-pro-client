
import image from './..//../assets/images/Trendy Banner.png'
const Banner = () => {
  return (
    <div className='flex justify-center items-center mt-0'>
      <img loading='lazy' src={image} alt="" className='bg-cover bg-center'/>
    </div>
  );
};

export default Banner;