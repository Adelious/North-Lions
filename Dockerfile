#FROM node:alpine

#WORKDIR /usr/src/app/

#COPY package*.json ./

#RUN npm install

#COPY . .

#CMD [ "node", "./src/index.js" ]


# Utiliser une image Node.js alpine
FROM node:alpine

# Définir le répertoire de travail
WORKDIR /usr/src/app/

# Installer les outils nécessaires
RUN apk add --no-cache git

# Ajouter un script conditionnel directement dans le Dockerfile
RUN echo '#!/bin/sh\n' \
    'if [ ! -d ".git" ]; then\n' \
    '  echo "Le dépôt Git n\'existe pas, clonage en cours...";\n' \
    '  git clone https://github.com/Adelious/North-Lions.git .;\n' \
    'else\n' \
    '  echo "Le dépôt Git existe, mise à jour en cours...";\n' \
    '  git pull;\n' \
    'fi;\n' \
    'echo "Installation des dépendances npm...";\n' \
    'npm install;\n' \
    'echo "Lancement de l\'application...";\n' \
    'node src/index.js;' \
    > /usr/src/app/entrypoint.sh && chmod +x /usr/src/app/entrypoint.sh

# Commande pour exécuter l'application
CMD ["sh", "/usr/src/app/entrypoint.sh"]
