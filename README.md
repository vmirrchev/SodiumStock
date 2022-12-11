# SodiumStock
Repository for Angular assignment project of Frontend course September 2022.

## Overview
This project represents an inventory management system for laboratories using chemical raw materials. The purpose of the system is to minimize materials shortage, track the work of the employees, give specific access, monitor current inventory, and prevent the usage of expired chemicals.

The system offers public login page, that would be accessible to everyone in the laboratory's network. Users and Admins could both log in with valid credentials. There is a separate view for employee management, only for employees with ADMIN roles. This could be accessed from the side navigation on the left.

Employee creation and deletion are the responsibility only of admins. The chemicals database is filled prior to usage.

The main feature of the system is entry creation for a certain chemical in stock. Each entry has its own STATUS, that accounts for the expiration date compared to the current date plus 7 days interval. Entries creation is possible for both the user and admin.

## Technological Stack
* Java-based backend with Spring Boot 5
* Postgresql database using Amazon RDS
* Angular client with Angular 15.0.1
* AWS Fargate cluster for backend deployment

## Database Schema

![image](https://user-images.githubusercontent.com/108091226/206922352-801f2eca-331c-454c-ac71-e152e4a8ade9.png)

*  OneToMany Realtionship between Compound and Entry
*  ManyToMany Relationship between Employee and Role
*  ManyToOne Relationship between Entry and Employee
*  ManyToOne Relationship between Entry and Compound
 
## Requirements
* Java version 11 or later
* Maven version 3.5 or later
* Node.js version 14.20 or later

## Installation
To run the application locally follow the steps:

For the backend use `mvn spring-boot:run` inside the .api folder.
* Database connection URL should be updated in the .properties file.
* Client 

For the client use `ng-serve` inside the .client folder.
* API URL should be updated in the environment.ts file.

## Usage
After the successful startup of both the API and client, navigate to **http:\\localhost:4200**. The first step is the login page:

![image](https://user-images.githubusercontent.com/108091226/206913873-cc4a6a4c-2a56-4d97-9a11-7070502f3fb4.png)

After successful login with valid employee credentials, the webapplication redirects to /home:

![image](https://user-images.githubusercontent.com/108091226/206918358-c910d716-669d-4f69-92e8-fde048c75d87.png)

* The webapp header contains username of the logged employee, button for contact via email, logout button and download button for user manual.
* When there are no entries present in the database, the system notifies via message:

![image](https://user-images.githubusercontent.com/108091226/206918401-aa82508b-3287-4b27-80bb-26cd0aa23b05.png)

* Adding new entry can be done with the help of modal containing dynamic form:

![image](https://user-images.githubusercontent.com/108091226/206918531-c289ff18-3a8a-4143-9d7a-1bf7df862a27.png)

Clicking on Statistics redirects to a webpage, containing piechart statistic about chemicals in stock fitlered by STATUS:

![image](https://user-images.githubusercontent.com/108091226/206919537-2004f897-32e9-4a92-9244-3096d4f5de81.png)

Clicking on Chemical Information redirects to a webpage, containing information regarding selected compound:

![image](https://user-images.githubusercontent.com/108091226/206920051-e4b4f76d-9a77-49cb-ada8-7b6301ec1fef.png)

* Selecting compound renders its information and structure image:

![image](https://user-images.githubusercontent.com/108091226/206920103-86882442-3b00-42e0-aea5-88a32c8203f4.png)

Clicking on Manage Employees redirects to a webpage for employee creation and deletion. There is also data for the specific employee:

![image](https://user-images.githubusercontent.com/108091226/206921736-d98cd065-b4e8-4468-8678-e8497dca178a.png)

* Adding new employee can be done with the help of modal containing dynamic form:

![image](https://user-images.githubusercontent.com/108091226/206921781-cde6f368-e42f-428f-ab41-3412ce085704.png)

* There will always be 1+ employee, as the backend uses on-start service that will check of admin presence in database and eventually create new one if needed.

## License

[MIT](https://choosealicense.com/licenses/mit/)

