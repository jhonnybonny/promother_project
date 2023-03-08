import fs from 'fs';
import {configFilePath} from '../configs/default-config';

interface Config {
    scripts: {
        sms: {
            enabled: boolean,
            sender_extension: string,
            message: string[]
        }
    }
}


export interface EditConfigBody {
    senderName: string
    message: string
    enabled: boolean
}

const getJson = (): Config => JSON.parse(fs.readFileSync(configFilePath) as unknown as string)

class SmsConfigService {
    getConfig() {
        const configJson = getJson()
        const configResponse: EditConfigBody = {
            senderName: configJson.scripts.sms.sender_extension,
            message: configJson.scripts.sms.message[0],
            enabled: configJson.scripts.sms.enabled
        }
        return configResponse
    }
    editConfig(editConfigRequestBody: EditConfigBody): EditConfigBody {
        const configJson = getJson()
        configJson.scripts.sms.enabled = editConfigRequestBody?.enabled
        configJson.scripts.sms.sender_extension = editConfigRequestBody?.senderName

        configJson.scripts.sms.message = [editConfigRequestBody?.message]

        fs.writeFileSync(configFilePath, JSON.stringify(configJson, null, 4))

        const modifiedConfig: EditConfigBody = {
            enabled: editConfigRequestBody.enabled,
            senderName: editConfigRequestBody.senderName,
            message: editConfigRequestBody.message
        }
        return modifiedConfig
    }
}

export default new SmsConfigService()