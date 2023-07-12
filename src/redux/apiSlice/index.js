import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import ReduxUrls, { BASE_URL } from '../../urls/ReduxUrls'




export const calApis = createApi({
    reducerPath: 'calApis',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
   
        getCardsData: builder.query({
            query: () => ({
                headers: { 'Content-Type': 'application/json' },
                url: ReduxUrls.CARDS_URL, method: 'GET'
            }),
        }),
    }),
})
export const {
    useGetCardsDataQuery
} = calApis