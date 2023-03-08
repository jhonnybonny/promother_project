import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';
import {API_URL} from '../api';
import {SubscriberWithImei} from '../models/Subscriber';
import {StatusCodes} from '../models';

export interface DefaultResponse<T> {
    resultCode: StatusCodes
    data: T
    errors: string[] | null
}

export interface SmsCountResponse {
    count: number
    isReport: number
}

export const clientsApi = createApi({
    reducerPath: 'clientApi',
    baseQuery: fetchBaseQuery({baseUrl: API_URL}),
    endpoints: (build) => ({
        getClients: build.query<DefaultResponse<SubscriberWithImei[]>, string>({
            query: () => ({
                url: '/clients'
            })
        }),
        getSmsCount: build.query<DefaultResponse<SmsCountResponse>, string>({
            query: (params) => ({
                url: '/smsCount'
            })
        }),
        deleteClients: build.mutation<StatusCodes, number>({
            query: (id) => ({
                url: `/clients/${id}`,
                method: 'DELETE'
            }),
            onQueryStarted(id, {dispatch, queryFulfilled}): Promise<void> | void {
                const updateExceptions = dispatch(
                    clientsApi.util.updateQueryData(
                        'getClients',
                        '',
                        (draft) => {
                            return {...draft, data: draft.data.filter(draftItem => draftItem.id !== id)}
                        }
                    )
                )
                queryFulfilled.catch(updateExceptions.undo)
            }
        })
    })
})

export const {useGetClientsQuery, useDeleteClientsMutation, useGetSmsCountQuery} = clientsApi