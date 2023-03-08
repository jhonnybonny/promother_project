import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';
import {API_URL} from '../api';
import {EditConfigFormValues, StatusCodes} from '../models';
import {EditBTSConfigFormValues} from '../components/forms/EditBTSConfig/helpers';

export enum ConfigBodyNames {
    NCC = 'NCC',
    MNC = 'MNC',
    shortName = 'shortName',
    longName = 'longName',
    band = 'band',
    CID = 'CID',
    LAC = 'LAC',
    BSID = 'BSID',
    ARFCN = 'ARFCN'
}

export interface ConfigBody {
    name: ConfigBodyNames
    valueToChange: number | string
}

export interface SmsConfig {
    enabled: boolean,
    senderName: string,
    message: string
}

export const configApi = createApi({
    reducerPath: 'configApi',
    baseQuery: fetchBaseQuery({baseUrl: API_URL}),
    endpoints: (build) => ({
        editBSCConfig: build.mutation<StatusCodes, ConfigBody[]>({
            query: (configs) => ({
                url: `/BSC`,
                method: 'PATCH',
                body: configs
            })
        }),
        editBTSConfig: build.mutation<StatusCodes, ConfigBody[]>({
            query: (configs) => ({
                url: `/BTS`,
                method: 'PATCH',
                body: configs
            })
        }),
        getBTSConfig: build.query<EditBTSConfigFormValues, string>({
            query: () => ({
                url: `/BTS`,
            })
        }),
        getBSCConfig: build.query<EditConfigFormValues, string>({
            query: () => ({
                url: `/BSC`,
            })
        }),
        getSMSConfig: build.query<SmsConfig, string>({
            query: () => ({
                url: `/sms-config`
            })
        }),
        editSMSConfig: build.mutation<StatusCodes, SmsConfig>({
            query: (smsConfig) => ({
                url: `/sms-config`,
                method: 'PATCH',
                body: smsConfig
            })
        }),
        getExceptions: build.query<string[], string>({
            query: () => ({
                url: `/imsi-exceptions`
            })
        }),
        addException: build.mutation<string[], {newException: string}>({
            query: (requestBody) => ({
                url: `/imsi-exceptions`,
                method: 'POST',
                body: requestBody
            }),
            onQueryStarted({newException}, {dispatch, queryFulfilled}): Promise<void> | void {
                const updateExceptions = dispatch(
                    configApi.util.updateQueryData(
                        'getExceptions',
                        '',
                        (draft) => {draft.push(newException)}
                    )
                )
                queryFulfilled.catch(updateExceptions.undo)
            }
        }),
        removeException: build.mutation<string[], string>({
            query: (imsi) => ({
                url: `/imsi-exceptions/${imsi}`,
                method: 'DELETE',
            }),
            onQueryStarted(imsi, {dispatch, queryFulfilled}): Promise<void> | void {
                const updateExceptions = dispatch(
                    configApi.util.updateQueryData(
                        'getExceptions',
                        '',
                        (draft) => {
                            return draft.filter( daftItem => daftItem !== imsi )
                        }
                    )
                )
                queryFulfilled.catch(updateExceptions.undo)
            }
        })


    })
})

export const {
    useEditBSCConfigMutation, useEditBTSConfigMutation,
    useGetExceptionsQuery, useAddExceptionMutation, useRemoveExceptionMutation,
    useGetSMSConfigQuery, useEditSMSConfigMutation, useGetBSCConfigQuery,
    useGetBTSConfigQuery
} = configApi