#!/bin/bash

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node

DIR="/home/ec2-user/images-backend"
if [-d "$DIR" ]; then
echo "$DIR exists"
else  
    "Createing ${DIR} directory" 
    mkdir ${DIR}
fi    
