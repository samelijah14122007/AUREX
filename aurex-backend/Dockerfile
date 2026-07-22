# syntax=docker/dockerfile:1

# Build the executable Spring Boot JAR with the project's Maven Wrapper so the
# Maven version remains consistent across local development and Render.
FROM eclipse-temurin:21-jdk-jammy AS build
WORKDIR /workspace

COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
RUN chmod +x mvnw

# Resolve dependencies before copying application sources to improve Docker
# layer reuse for source-only changes.
RUN ./mvnw -B -ntp dependency:go-offline

COPY src/ src/
RUN ./mvnw -B -ntp package -DskipTests

# Keep the runtime image small and run the process without root privileges.
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

RUN groupadd --system spring && useradd --system --gid spring --home-dir /app spring \
    && mkdir -p /app/uploads \
    && chown -R spring:spring /app

# Spring Boot repackages the executable artifact as the sole target/*.jar file.
COPY --from=build --chown=spring:spring /workspace/target/*.jar /app/app.jar

USER spring

EXPOSE 8080

# Prefer an explicitly configured SERVER_PORT, while also honoring Render's
# standard PORT variable when SERVER_PORT is not supplied.
ENTRYPOINT ["sh", "-c", "exec java -Dserver.port=\"${SERVER_PORT:-${PORT:-8080}}\" -jar /app/app.jar"]
