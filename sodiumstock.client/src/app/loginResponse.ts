export interface LoginResponse {
    "id": number,
    "username": string,
    "email": string,
    "roles": string[],
    "token": string,
    "type": string
}