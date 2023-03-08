export enum StatusCodes {
    Success = 0,
    Error = 1
}
export interface EditConfigFormValues {
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