export interface Entry {
        "id": number,
        "employee": {
            "id": number,
            "username": string,
            "firstName": string,
            "lastName": string,
            "email": string,
            "phoneNumber": string,
            "password": string
        },
        "compound": {
            "id": number,
            "casName": string,
            "casNumber": string,
            "molecularFormula": string,
            "molarMass": number,
            "boilingPoint": number,
            "meltingPoint": number,
            "density": number,
            "otherNames": string[]
        },
        "entryDate": string,
        "expirationDate": string
}