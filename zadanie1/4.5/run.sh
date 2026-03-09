#!/bin/bash

echo "Uruchomienie przez Java:"
cd src/main/java
javac HelloWorld.java
java HelloWorld

sleep 2
cd ../../..

echo "Uruchomienie przez Gradle:"
source $HOME/.sdkman/bin/sdkman-init.sh
gradle run