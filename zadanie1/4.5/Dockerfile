FROM ubuntu:24.04

RUN apt update && apt install -y openjdk-21-jdk 
RUN apt install -y curl unzip zip
RUN curl -s "https://get.sdkman.io" | bash
RUN bash -c "source $HOME/.sdkman/bin/sdkman-init.sh && sdk install gradle"

WORKDIR /home/
COPY HelloWorld.java src/main/java/
COPY run.sh .

RUN printf 'plugins { id "application" }\napplication {\n    mainClass = "HelloWorld"\n}\n' > build.gradle

CMD ["/bin/bash"]