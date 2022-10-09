#!bin/bash

cd /home/ec2-user/images-backend
sudo chmod -R 777 /home/ec2-user/images-backend
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

npm install
npm run build
npm start > app.out.log 2> app.err.log < /dev/null &