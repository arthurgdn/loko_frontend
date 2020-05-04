# Loko frontend
Loko est une plateforme de publications d'annonces avec une dimension locale, où chaque individu peut vendre des biens et des services au sein même de sa communauté. 

Le frontend est réalisé avec [React](https://reactjs.org/docs/getting-started.html) 
Le backend est disponible sur le dépôt suivant : [Loko backend](https://github.com/arthurgdn/loko_backend)

## Pour commencer


### Installation des packages
* Executez la commande ``$ npm install`` à la racine du répertoire du projet

## Config
Pour créer l'environnement de développement, veuilez créer un fichier .env.development à la racine du projet et y renseigner les variables suivantes : DEV_URL (qui correspond à l'adresse du serveur où est situé le backend de l'application) et MAPBOX_API_KEY qui est la clée de l'API de géolocalisation à récuperer [ici](https://www.mapbox.com/)
## Démarrage

* Pour lancer le serveur de dev  ``$ npm run dev-server`` 
* Pour lancer le build de webpack ``$ npm run build:dev``
* Pour lancer le build de production ``$npm run build:prod``

Vous devez également lancer [le backend du projet](https://github.com/arthurgdn/loko_backend) en local pour pouvoir consommer les API.






