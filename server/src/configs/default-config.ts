// ======================================================
// Config value with absolute path must include '\\' instead of single '\ (Example: `C:\\folder\\name`)
// Or you can consider to user String.raw`C:\folder\name`
// =====================================================

// =======================================================================
// Production config paths (calypso dragonos bts)
export const bscConfigPath = '/usr/src/CalypsoBTS/openbsc.cfg'
export const btsConfigPath = '/usr/src/CalypsoBTS/osmo-bts-trx-calypso.cfg'
export const configFilePath = '/usr/src/osmo-nitb-scripts-calypsobts/config.json'
export const dataBaseLink = '/usr/src/CalypsoBTS/hlr.sqlite3'
// =======================================================================

// ==========================================================
// Test config paths
// export const bscConfigPath = './src/configs/openbsc.cfg.txt'
// export const btsConfigPath = './src/configs/osmo-bts.cfg.txt'
// export const configFilePath = './src/configs/config.json'
// export const dataBaseLink = './src/hlr.sqlite3'
// ===========================================================


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

export interface ResultConfig {
    NCC: string
    MNC: string
    shortName: string
    longName: string
    band: string
    CID: string
    LAC: string
    BSID: string
    ARFCN: string
}

export const defaultConfig: { [key in ConfigBodyNames]: string } = {
    [ConfigBodyNames.NCC]: 'network country code',
    [ConfigBodyNames.MNC]: 'mobile network code',
    [ConfigBodyNames.shortName]: 'short name',
    [ConfigBodyNames.longName]: 'long name',
    [ConfigBodyNames.band]: 'band',
    [ConfigBodyNames.CID]: 'cell_identity',
    [ConfigBodyNames.LAC]: 'location_area_code',
    [ConfigBodyNames.BSID]: 'base_station_id_code',
    [ConfigBodyNames.ARFCN]: 'arfcn'
}