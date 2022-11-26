FROM openjdk:17
COPY target/sodiumstock.api-0.0.1-SNAPSHOT app.jar
ENTRYPOINT ["java","-jar","/app.jar"]