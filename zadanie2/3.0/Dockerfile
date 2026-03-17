FROM ubuntu:24.04

RUN apt update && apt install -y openjdk-21-jdk 
RUN apt install -y curl unzip zip gnupg

RUN curl -fsSL "https://keyserver.ubuntu.com/pks/lookup?op=get&search=0x2EE0EA64E40A89B84B2DF73499E82A75642AC823" | gpg --dearmor -o /etc/apt/trusted.gpg.d/sbt.gpg
RUN echo "deb https://repo.scala-sbt.org/scalasbt/debian all main" | tee /etc/apt/sources.list.d/sbt.list
RUN apt update && apt install -y sbt

COPY skrypt.sh . 
RUN chmod +x /skrypt.sh

CMD ["/bin/bash", "-c", "./skrypt.sh"]