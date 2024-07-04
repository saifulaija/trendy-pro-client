
import BestSellingProductList from "./Admin/BestSellinProduct";
import DisplayCards from "./Admin/DisplayCards";
import InventoryStock from "./Admin/InventoryStock";
import MonthlyEarning from "./Admin/MonthlyEarning";
import PieYearlyEarnings from "./Admin/PieYearly";

const AdminDashboard = () => {



  return (
    <div className=" bg-[#fafbfb]  ">
      <DisplayCards />
      <div className=" flex flex-wrap lg:flex-nowrap justify-between gap-5 mt-10">
        <InventoryStock />

        <div>
          <MonthlyEarning />
          <PieYearlyEarnings />
        </div>
      </div>
      <BestSellingProductList/>
    </div>
  );
};

export default AdminDashboard;
