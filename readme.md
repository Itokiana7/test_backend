# Test Projet backEnd NodeJS
Une API REST pour gérer des utilisateurs et entités avec Node.js, express, Prisma, et MySQL.

git clone https://github.com/Victokiana/test_backend

cd test_backend

npm install

Créer le fichier .env 
    DATABASE_URL="mysql://Ton_user_MYSQL:ton_password@localhost:3306/nom_de_ta_bdd"

npx prisma generate

npx prisma migrate dev --name init

Vérifier la connexion à la base

npm run dev