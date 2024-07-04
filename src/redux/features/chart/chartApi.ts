import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getInventoryChartData: builder.query({
      query: () => {
        return {
          url: "/chart/inventory",
          method: "GET",
        };
      },
    }),
    getEarningData: builder.query({
      query: () => {
        return {
          url: "/chart/earning",
          method: "GET",
        };
      },
    }),
    getUtilsData: builder.query({
      query: () => {
        return {
          url: "/chart/utils",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetInventoryChartDataQuery,useGetEarningDataQuery,useGetUtilsDataQuery } = productApi;
