import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {API_URL} from "../api";
import {StatusCodes} from '../models';

export interface Message {
    text: string
}

export const coordinatesAPI = createApi({
    reducerPath: 'coordinatesAPI',
    baseQuery: fetchBaseQuery({baseUrl: API_URL}),
    endpoints: (build) => ({
        getCoordinates: build.query<Message[], string>({
            query: (params) => ({
                url: `/logs`
            }),
            async onCacheEntryAdded(
                arg,
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
            ) {
                const ws = new WebSocket('ws://localhost:9000')
                try {
                    await cacheDataLoaded
                    const listener = (event: MessageEvent) => {
                        const data = JSON.parse(event.data)
                        updateCachedData((draft) => {
                            draft.push({text: data})
                        })
                    }
                    ws.addEventListener('message', listener)
                } catch {
                    // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
                    // in which case `cacheDataLoaded` will throw
                }
                await cacheEntryRemoved
                ws.close()
            },
        }),
        startProcess: build.mutation<StatusCodes, string>({
            query: () => ({
                url: `/logs`,
                method: 'POST'
            })
        }),
        killProcess: build.mutation<StatusCodes, string>({
            query: () => ({
                url: `/logs`,
                method: 'DELETE'
            })
        }),
        resetDatabase: build.mutation<StatusCodes, string>({
            query: () => ({
                url: `/logs/reset`,
                method: 'DELETE'
            })
        }),
        executeUnknown: build.mutation<StatusCodes, string>({
            query: () => ({
                url: `/logs/unknown`,
                method: 'POST'
            })
        })
    })
})

export const {
    useGetCoordinatesQuery, useKillProcessMutation,
    useStartProcessMutation, useResetDatabaseMutation,
    useExecuteUnknownMutation
} = coordinatesAPI