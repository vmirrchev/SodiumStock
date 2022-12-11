export interface LoginCredentials {
    username: string;
    password: string;
}
export interface LoginResponse {
    "id": number,
    "username": string,
    "email": string,
    "roles": string[],
    "token": string,
    "type": string
}