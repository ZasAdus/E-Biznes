FROM ubuntu:24.04
 
RUN apt update && apt install -y openjdk-21-jdk curl unzip zip
RUN curl -s "https://get.sdkman.io" | bash
RUN bash -c "source $HOME/.sdkman/bin/sdkman-init.sh && sdk install kotlin && sdk install gradle"
 
WORKDIR /discordProject/app

COPY build.gradle.kts .

RUN mkdir -p src/main/kotlin/com/discord
COPY Main.kt src/main/kotlin/com/discord/Main.kt

RUN bash -c "source $HOME/.sdkman/bin/sdkman-init.sh && gradle build"

CMD ["/bin/bash", "-c", "$HOME/.sdkman/candidates/gradle/current/bin/gradle run"]

 