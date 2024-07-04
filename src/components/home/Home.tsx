import Banner from "../banner/Banner";

import MenProduct from "../mensProduct/MenProduct";
import WomenProduct from "../womenProduct/WomenProduct";
import KidProducts from "../kidsProduct/KidProducts";

import SubBanner from "../subBanner/SubBanner";


import { motion } from "framer-motion";

import NewBestSellingProducts from "../bestSellingProduct/NewBestSelling";

const Home = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <Banner />
      </motion.div>
      <div>
        <SubBanner />
      </div>

      <NewBestSellingProducts />

      <MenProduct />

   

      <WomenProduct />
      <KidProducts />
    </>
  );
};

export default Home;
