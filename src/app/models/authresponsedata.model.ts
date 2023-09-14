export interface  AuthResponseData{
    kind: string
    localId: string
    email: string
    displayName: string
    token: string
    registered?: boolean
    refreshToken?: string
    expirationDate: Date
}