import express from "express";
import {StatusCodes} from "../types";
import * as fs from 'fs';
import {bscConfigPath, ConfigBodyNames, defaultConfig, ResultConfig} from '../configs/default-config';

export interface ConfigBody {
    name: ConfigBodyNames
    valueToChange: number | string
}


class BSCController {
    async getConfig(request: express.Request, response: express.Response) {
        const config: string[] = fs.readFileSync(bscConfigPath,'utf8').split('\n')
        const result: ResultConfig = {
            band: '', BSID: '', CID: '', LAC: '', MNC: '',
            ARFCN: '', shortName: '', longName: '', NCC: ''
        }
        config.forEach( configItem => {
            Object.entries(defaultConfig).forEach(property => {
                const targetProperty = property[1]
                if (!configItem.includes(targetProperty)) return
                const splitValue = configItem.split(targetProperty)
                result[property[0] as ConfigBodyNames] = splitValue[1]
            })
        } )
        response.status(200).json(result)
    }
    async replaceLine(request: express.Request, response: express.Response) {
        const resultCode = await new Promise((resolve, reject) => {
            fs.readFile(bscConfigPath, 'utf8', (error, data) => {
                if (error) console.log(error)
                const result = data
                    .split('\n')
                    .map((item) => {
                        const requestBody: ConfigBody[] = request.body
                        requestBody.forEach( (requestItem, requestItemIndex) => {
                            const phraseToReplace = defaultConfig[requestItem.name]
                            if (!item.includes(phraseToReplace)) return
                            const splitValue = item.split(phraseToReplace)
                            splitValue[1] = String(requestItem.valueToChange)
                            item = splitValue.join(phraseToReplace + ' ')
                        } )
                        return item
                    })
                    .join('\n')
                fs.writeFile(bscConfigPath, result, () => {
                    resolve(StatusCodes.Success)
                })
            })
        })
        response.status(200).json(resultCode)
    }
}

export default new BSCController()