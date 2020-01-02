#!/bin/sh

## DB Configuration
## DB Configuration

red=`tput setaf 1`
green=`tput setaf 2`
reset=`tput sgr0`
bold=$(tput bold)
normal=$(tput sgr0)

read -p "${green}${bold}Database Host Name: ${normal}" name
read -p "${green}${bold}Database name: ${normal}" dbname
read -p "${green}${bold}Username: ${normal} " usernmae
read -p "${green}${bold}Password: ${normal}" password
read -p "${green}${bold}Port: ${normal} " port



OUT=./models
CONFIG=./core/genarators/model.genarator.json

## Installing sequelize-auto
if [! npm list -g | grep sequelize-auto]
then
    npm install -g sequelize-auto
fi

if [ ! -d $OUT ]; then
    mkdir -p $OUT;
fi

sequelize-auto -o $OUT -d $dbname -h $name -u $usernmae -p $port -x $password -e postgres --config $CONFIG