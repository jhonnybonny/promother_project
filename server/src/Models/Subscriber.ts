export interface Subscriber {
    id: number
    created: string
    updated: string
    imsi: number
    extension: number
    authorized: 1 | 0
    tmsi: number | null
    lac: number
    expire_lu: string
    imei?: number
}
export interface SubscriberWithImei extends Subscriber {
    imei: number
}