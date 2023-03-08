import express from 'express';
import fs from 'fs';
import {btsConfigPath, ConfigBodyNames, defaultConfig} from '../configs/default-config';
import {StatusCodes} from '../types';
import {ConfigBody} from './BSC.controller';


class BTSController {
    async getConfig(request: express.Request, response: express.Response) {
        const config: string[] = fs.readFileSync(btsConfigPath,'utf8').split('\n')
        const result: {band: string} = {
            band: ''
        }
        config.forEach( configItem => {
            if (!configItem.includes(ConfigBodyNames.band)) return
            const splitValue = configItem.split(ConfigBodyNames.band)
            result.band = splitValue[1]
        } )
        response.status(200).json(result)
    }
    async replaceLine(request: express.Request, response: express.Response) {
        const resultCode = await new Promise((resolve, reject) => {
            fs.readFile(btsConfigPath, 'utf8', (error, data) => {
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
                fs.writeFile(btsConfigPath, result, () => {
                    resolve(StatusCodes.Success)
                })
            })
        })
        response.status(200).json(resultCode)
    }
}
export default new BTSController()