export interface Employee {
        "id": number,
        "username" : string,
        "firstName" : string,
        "lastName" : string,
        "email" : string,
        "phoneNumber" : string,
        "role" : string,
        "roles" : [
                {
                    "id": number,
                    "name": string
                }
            ]
        "password" : string
}
export interface EmployeeResponse {
        "message" : string
}