# Utiliser une image Node.js alpine
FROM node:alpine

# Définir le répertoire de travail
WORKDIR /usr/src/app/

# Installer git et bash (bash est facultatif, mais pratique pour les scripts avancés)
RUN apk add --no-cache git bash

# Copier le script d'entrée dans l'image
COPY entrypoint.sh /usr/src/entrypoint.sh

# Donner les permissions d'exécution au script
RUN chmod +x /usr/src/entrypoint.sh

# Commande pour exécuter le script d'entrée
ENTRYPOINT ["/usr/src/entrypoint.sh"]
