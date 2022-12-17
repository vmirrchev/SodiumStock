# SodiumStock
Repository for Angular assignment project of SoftUni Frontend course September 2022.

## Overview
This project represents an inventory management system for laboratories using chemical raw materials. The purpose of the system is to minimize materials shortage, track the work of the employees, give specific access, monitor current inventory, and prevent the usage of expired chemicals.

The system offers public login page, that would be accessible to everyone in the laboratory's network. Users and Admins can both log in with valid credentials. There is a separate view for employee management, only for employees with ADMIN roles. This could be accessed from the side navigation on the left.

Employee creation and deletion are the responsibility only of admins. The chemicals database is filled prior to usage.

The main feature of the system is entry creation for a certain chemical in stock. Each entry has its own STATUS, that accounts for the expiration date compared to the current date plus 7 days interval. Entries creation is possible for both the user and admin.

## Technological Stack
* Java-based api with Spring Boot 5, Spring Data JPA
* Postgresql database using Amazon RDS
* Angular client with Angular 15.0.1
* AWS Fargate cluster for api deployment
* Docker and AWS ECR
* AWS S3 Bucket for client deployment

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
* CORS url for client should be updated in api controllers.

For the client use `ng-serve` inside the .client folder.
* API url should be updated in the environment.ts file.

## Deployment

For the backend there is Dockerfile and CI pipeline in GitHub Actions creating docker image from the .jar file after building the API.
As last step the docker image is pushed to AWS Elastic container registry and new task is created manually in ECS Fargate Cluster.

The client build comamnd is ``ng build --configuration production`` creating new dist folder. The content of this folder gets copied inside AWS S3 Bucket and hosted as static webpage with public access.

![image](https://user-images.githubusercontent.com/108091226/207162175-7766d7c1-d8ef-45a4-a5cb-2c55ca91931a.png)

![image](https://user-images.githubusercontent.com/108091226/207162677-befc3000-7977-4b83-93b2-c0f50f554271.png)

Images of compounds are stored in /images folder in the S3 bucket.

## Usage
Navigate to the baseUrl: **http://sodiumstock-resources.s3-website.eu-central-1.amazonaws.com/**. The first step is the login page:

![image](https://user-images.githubusercontent.com/108091226/208263041-ff15740d-868f-4418-91b5-dea9e29c5f0f.png)

After successful login with valid employee credentials, the webapplication redirects to baseUrl/home:

![image](https://user-images.githubusercontent.com/108091226/208263061-3dfcdbd5-ee91-4523-83fa-4a09fd902529.png)

* The webapp header contains username of the logged employee, button for contact via email, logout button and download button for user manual.
* When there are no entries present in the database, the system notifies via message.
* On each data fetch or request error the system notifies via message:

![image](https://user-images.githubusercontent.com/108091226/208263160-8eb1f8b4-e7f8-4462-8c77-1d4ce6e54a05.png)

![image](https://user-images.githubusercontent.com/108091226/208263192-9bc72c1f-e168-4419-b4e3-172a738ed072.png)

* Adding new entry can be done with the help of modal containing dynamic form:

![image](https://user-images.githubusercontent.com/108091226/208263246-23574556-e0bb-46f0-8bad-c98e86b0de1d.png)

Clicking on Statistics redirects to a webpage, containing piechart statistic about chemicals in stock fitlered by STATUS:

![image](https://user-images.githubusercontent.com/108091226/208263260-9319244a-3d4c-4e91-8560-1dc0c7f09e7f.png)

Clicking on Chemical Information redirects to a webpage, containing information regarding selected compound, by default all chemicals are rendered:

![image](https://user-images.githubusercontent.com/108091226/208263278-31f63839-329e-4494-841f-684daeac461f.png)

![image](https://user-images.githubusercontent.com/108091226/208263301-8ff7f0e1-66d7-482c-9ff5-7940eede181d.png)

Clicking on Manage Employees redirects to a webpage for employee creation and deletion. There is also data for the specific employee:

![image](https://user-images.githubusercontent.com/108091226/208263313-b135a876-7f59-4008-bd16-47bb2c01dac0.png)

* Adding new employee can be done with the help of modal containing dynamic form:

![image](https://user-images.githubusercontent.com/108091226/208263336-cf07effd-f3f2-4570-be71-a35fddbde0b8.png)

* There will always be 1+ employee, as the backend uses on-start service that will check of admin presence in database and eventually create new one if needed.

Navigating to a webpage, that does not exist will redirect to a custom 404 not found webpage. Clicking on Go to Home Page will redirect to the login page if the user has not yet logged in:

![image](https://user-images.githubusercontent.com/108091226/208263356-a05958bf-00b6-4e8c-81ed-3f1ddfb3702b.png)

## Further Implementations

* Custom form validations for employee creation
* Select filter for Current Stock and Employee Management sections
* Action button to edit employee

## License

[MIT](https://choosealicense.com/licenses/mit/)

