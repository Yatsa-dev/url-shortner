import { apiSlice } from '../store/api/apiSlice';

export const urlsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAllUrls: builder.query({
      query: () => ({
        url: 'url',
        method: 'GET',
      }),
    }),
    createShortUrl: builder.mutation({
      query: args => {
        return {
          url: 'url/short',
          method: 'POST',
          body: args,
        };
      },
    }),
  }),
});

export const { useGetAllUrlsQuery, useCreateShortUrlMutation } = urlsApiSlice;
