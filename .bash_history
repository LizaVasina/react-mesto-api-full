cat ~/.ssh/id_rsa.pub 
cd ~
ls
sudo mkdir -p -m 700 .ssh
# создадим директорию для конфига ssh
sudo mkdir -p -m 700 .ssh
# создадим конфиг с ключами, для которых разрешено подключение
sudo touch .ssh/authorized_keys
sudo chmod 664 .ssh/authorized_keys
sudo chown -R something:something .ssh
sudo chown -R lizavasina:lizavasina .ssh
sudo nano ./.ssh/authorized_keys
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt install -y nodejs 
node -v
curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
sudo apt update
sudo apt install -y mongodb-org
sudo service mongod start 
sudo systemctl enable mongod.service 
mongo
sudo apt install -y git 
git --version 
pwd
git clone https://github.com/LizaVasina/react-mesto-api-full.git
sudo npm install pm2 -g 
pm2 start app.js 
ls
cd react-mesto-api-full/
cd backend/
pm2 start app.js 
pm2 startup
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u lizavasina --hp /home/lizavasina
pm2 save
cd .. 
cd ..
cd ~
pwd
sudo apt update
sudo apt install -y nginx
sudo ufw allow 'Nginx Full' OpenSSH
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full' OpenSSH
sudo ufw allow 443
sudo ufw allow 80
sudo ufw enable
sudo systemctl enable --now nginx
sudo nano /etc/nginx/sites-available/default
sudo nginx -t
sudo nano /etc/nginx/sites-available/default
sudo nginx -t 
sudo systemctl reload nginx
git pull origin main
git remote
git remote add origin https://github.com/LizaVasina/react-mesto-api-full.git
git pull origin main
git init
git pull origin main
git remote
git pull
git branch --set-upstream-to=remote/main main
git branch
git checkout -b main
git pull remote main
git pull origin main
git remote add origin https://github.com/LizaVasina/react-mesto-api-full.git
git pull origin main
pm2 restart app
git pull origin main
scp -r ./build/* lizavasina@178.154.221.44:/home/lizavasina/frontend
sudo nano /etc/nginx/sites-available/default
sudo nginx -t
sudo systemctl restart nginx
sudo nano /etc/nginx/sites-available/default
sudo nginx -t
sudo systemctl restart nginx
sudo nano /etc/nginx/sites-available/default
sudo nginx -t
sudo systemctl restart nginx
sudo apt update
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx
sudo nano /etc/nginx/sites-available/default
sudo systemctl reload nginx
git pull
pwd
cd react-mesto-api-full/
ls
cd backend/
ls
cd ..
npm i
npm run dev
npm run lint
ls\
