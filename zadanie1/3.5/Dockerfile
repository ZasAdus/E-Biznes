FROM ubuntu:24.04

RUN apt update && apt install -y openjdk-8-jdk 
RUN apt install -y curl unzip zip
RUN curl -s "https://get.sdkman.io" | bash
RUN bash -c "source $HOME/.sdkman/bin/sdkman-init.sh && sdk install kotlin"

CMD ["/bin/bash"]