import sqlite3 from 'sqlite3';
import {dataBaseLink} from './configs/default-config';
import {StatusCodes} from './types';

export const connectToDatabase = (): Promise<sqlite3.Database | null> => {
    return new Promise(  (resolve, reject) => {
        const dataBase = new sqlite3.Database(
            dataBaseLink,
            sqlite3.OPEN_READWRITE,
            (error) => {
                if (error) {
                    console.log(`Database error: ${error}`)
                    reject(error)
                }
                else resolve(dataBase)
            }
        )
    })
}


export interface DefaultResponse<T> {
    resultCode: StatusCodes
    data: T
    errors: string[] | null
}

export const createErrorResponse = (error: string | null | Error): DefaultResponse<{}> => ({
    data: {},
    errors: [`Database error: ${error ? JSON.stringify(error) : ''}`],
    resultCode: StatusCodes.Error
})

export const getDataFromDatabase = async (sql: string): Promise<DefaultResponse<any>> => {
    try {
        const dataBase = await connectToDatabase()
        if (!dataBase) return createErrorResponse('Database error')
        const dataFromDb = await new Promise((resolve, reject) => {
            dataBase.all(sql, (error, data) => {
                if (error) {
                    console.log(`Database error: ${error}`)
                    reject(createErrorResponse(error))
                    return
                }
                resolve(data)
            })
        })
        dataBase.close()
        const result: DefaultResponse<any> = {
            resultCode: StatusCodes.Success,
            data: dataFromDb,
            errors: null
        }
        return result
    } catch (error) {
        console.error(`Database error: ${error}`)
        return new Promise((resolve) => {
            resolve(createErrorResponse(error as string))
        })
    }
}