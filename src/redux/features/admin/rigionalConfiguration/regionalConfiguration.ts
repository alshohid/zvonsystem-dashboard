import { baseApi } from "@/src/redux/api/baseApi";
import {
  IRegionalConfigurationResponse,
  IRegionalConfigurationParams,
  IRegionalFuneralHouseResponse,
} from "@/src/types/regionalConfigurationTypes";

const regionalConfigurationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAdminRegionalDeathNotice: builder.query<
      IRegionalConfigurationResponse,
      IRegionalConfigurationParams
    >({
      query: (params) => {
        return {
          url: "/admin/regional",
          method: "GET",
          params: {
            page: params.page,
            limit: params.limit,
            ...(params.filter && { filter: params.filter }),
          },
        };
      },
    }),
    getAllAdminRegionalFuneralHouse: builder.query<
      IRegionalFuneralHouseResponse,
      IRegionalConfigurationParams
    >({
      query: (params) => {
        return {
          url: "/admin/regional/funeral-houses",
          method: "GET",
          params: {
            page: params.page,
            limit: params.limit,
            ...(params.filter && { filter: params.filter }),
          },
        };
      },
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetAllAdminRegionalDeathNoticeQuery,
  useGetAllAdminRegionalFuneralHouseQuery,
} = regionalConfigurationApi;
export default regionalConfigurationApi;
