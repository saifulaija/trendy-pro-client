import { useGetUtilsDataQuery } from "../../../redux/features/chart/chartApi";

type TUtils = {
  totalProducts: number;
  totalUsers: number;
  totalOrders: number;
  totalSoldItem: number;
  totalSoldMoney: number;
};

const DisplayCards = () => {
  const { data } = useGetUtilsDataQuery("");
  const utils: TUtils = data?.data;

  return (
    <div className="flex flex-col lg:flex-row justify-center gap-5 items-center w-full">
      <div className="w-full lg:w-3/12 lg:mx-3 mb-6 lg:mb-0">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400">Earnings</p>
              <p className="text-3xl text-gray-700 font-semibold">
                ৳{utils?.totalSoldMoney}
              </p>
            </div>
            <button
              type="button"
              className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full p-4"
              style={{ backgroundColor: "rgb(3, 201, 215)" }}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"></path>
              </svg>
            </button>
          </div>
          <div className="mt-6">
            
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row w-full lg:w-9/12 gap-5">
        <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-full p-4 pt-9 rounded-2xl">
          <button
            type="button"
            className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
            style={{
              color: "rgb(3, 201, 215)",
              backgroundColor: "rgb(229, 250, 251)",
            }}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path d="M9 12c1.93 0 3.5-1.57 3.5-3.5S10.93 5 9 5 5.5 6.57 5.5 8.5 7.07 12 9 12zm0-5c.83 0 1.5.67 1.5 1.5S9.83 10 9 10s-1.5-.67-1.5-1.5S8.17 7 9 7zm.05 10H4.77c.99-.5 2.7-1 4.23-1 .11 0 .23.01.34.01.34-.73.93-1.33 1.64-1.81-.73-.13-1.42-.2-1.98-.2-2.34 0-7 1.17-7 3.5V19h7v-1.5c0-.17.02-.34.05-.5zm7.45-2.5c-1.84 0-5.5 1.01-5.5 3V19h11v-1.5c0-1.99-3.66-3-5.5-3zm1.21-1.82c.76-.43 1.29-1.24 1.29-2.18a2.5 2.5 0 00-5 0c0 .94.53 1.75 1.29 2.18.36.2.77.32 1.21.32s.85-.12 1.21-.32z"></path>
            </svg>
          </button>
          <p className="mt-3">
            <span className="text-lg text-slate-800 font-semibold">
              {utils?.totalUsers}
            </span>
            <span className="text-sm text-green-600 ml-2">+4%</span>
          </p>
          <p className="text-sm text-gray-400 font-semibold mt-1">Customers</p>
        </div>

        <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-full p-4 pt-9 rounded-2xl">
          <button
            type="button"
            className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
            style={{
              color: "rgb(255, 244, 229)",
              backgroundColor: "rgb(254, 201, 15)",
            }}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 16 16"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"></path>
            </svg>
          </button>
          <p className="mt-3">
            <span className="text-lg font-semibold text-slate-800">
              {utils?.totalProducts}
            </span>
            <span className="text-sm text-green-600 ml-2">+23%</span>
          </p>
          <p className="text-sm text-gray-400 mt-1 font-semibold">Products</p>
        </div>

        <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-full p-4 pt-9 rounded-2xl">
          <button
            type="button"
            className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
            style={{
              color: "rgb(228, 106, 118)",
              backgroundColor: "rgb(255, 244, 229)",
            }}
          >
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="12" y1="20" x2="12" y2="10"></line>
              <line x1="18" y1="20" x2="18" y2="4"></line>
              <line x1="6" y1="20" x2="6" y2="16"></line>
            </svg>
          </button>
          <p className="mt-3">
            <span className="text-lg font-semibold text-slate-800">
              {utils?.totalSoldItem}
            </span>
            <span className="text-sm text-green-600 ml-2">+38%</span>
          </p>
          <p className="text-sm text-gray-400 mt-1 font-semibold">
            Successful Orders
          </p>
        </div>

        <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-full p-4 pt-9 rounded-2xl">
          <button
            type="button"
            className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
            style={{
              color: "rgb(0, 194, 146)",
              backgroundColor: "rgb(235, 250, 242)",
            }}
          >
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              ></path>
            </svg>
          </button>
          <p className="mt-3">
            <span className="text-lg font-semibold text-slate-800">
              {utils?.totalOrders}
            </span>
            <span className="text-sm text-red-600 ml-2">-12%</span>
          </p>
          <p className="text-sm text-gray-400 mt-1 font-semibold">Orders</p>
        </div>
      </div>
    </div>
  );
};

export default DisplayCards;
