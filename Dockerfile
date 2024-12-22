FROM node:alpine

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Cloner le dépôt Git
RUN apk add --no-cache git && \
    git clone https://github.com/Adelious/North-Lions.git . && \
    rm -rf .git

# Installer les dépendances
RUN npm install

# Lancer l'application
CMD [ "node", "/src/index.js" ]
