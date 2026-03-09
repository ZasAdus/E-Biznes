FROM ubuntu:24.04

RUN apt update && apt install -y openjdk-21-jdk 
RUN apt install -y curl unzip zip
RUN curl -s "https://get.sdkman.io" | bash
RUN bash -c "source $HOME/.sdkman/bin/sdkman-init.sh && sdk install kotlin && sdk install gradle"

WORKDIR /home/
RUN printf 'plugins { id "java" }\nrepositories {\n mavenCentral()\n}\ndependencies {\n implementation "org.xerial:sqlite-jdbc:3.51.2.0"\n}\n' > build.gradle

RUN bash -c "source $HOME/.sdkman/bin/sdkman-init.sh && gradle build"

CMD ["/bin/bash"]