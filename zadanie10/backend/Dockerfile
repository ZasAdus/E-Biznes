FROM gradle:8.14.2-jdk21
WORKDIR /backend
COPY settings.gradle.kts gradle.properties ./
COPY gradle ./gradle
COPY app/build.gradle.kts app/build.gradle.kts
COPY app/src app/src
RUN gradle :app:bootJar --no-daemon
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/backend/app/build/libs/app.jar"]