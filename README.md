# Punto

### Lancer le projet :

1. Mon projet tourne grâce à Docker ainsi que nodeJS il faut donc **absolument** : https://www.docker.com/products/docker-desktop/ & https://nodejs.org/fr/download/
2. Lancer DockerDesktop
3. Dans un terminal, rendez-vous à la racine du dossier "**Punto**"
4. Entrer la commande : `npm install`
4. Entrer la commande : `docker compose up -d --build`
6. Pour lancer le front, rendez-vous dans le dossier : **punto_front** et entrer la commande : `npm start`
7. Quand la commande est finie, vous pouvez vous rendre sur : http://localhost:5173/
8. Créer vous un compte grâce au bouton d'inscription en renseignant vos données 
9. Vous pouvez maintenant vous connecter avec votre compte et "jouer" à Punto
### Fonctionnalités et compétences attendues en NodeJS :

1. [x] Un plateau graphique et un ensemble de cartes
2. [ ] Un fonctionnement exact des règles du jeu avec des événements à gérer
3. [x] Un système d'inscription
4. [ ] Un système multijoueur
5. [x] Un packaging parfait et expliqué *(l'installation doit être détaillée dans le rapport)*
6. [x] Des commentaires
7. [] Des tests documentés *(unitaires, montée en charge)*
8. [] Gestion de l'historique des parties
9. [x] Mise en place d'une ou plusieurs API *(accès à la base, gestion d'une partie, distribution des cartes aléatoirement, ...)*
10. [x] Séparation back-end / front-end documentée
11. [x] Utilisation de REACT ou équivalent (justifier chaque techno)
12. [x] Documentation et description de fonctionnalités spécifiques à nodejs et react *(promise, routage)*
13. [ ] BONUS : mise en place de joueurs gérés par une IA basée sur node

### Fonctionnalités et compétences attendues en NoSQL :

1. [x] Description packaging et installation d'un serveur Mongodb (voir rapport)
2. [x] Décrire la/les bases et la/les collections utiles *(gestion du jeu, gestion de l'historique)* (voir rapport)
3. [x] Création et description des schémas *(les schémas doivent être riches)* (voir rapport)
4. [x] Description des procédures de sauvegarde / transferts des données (voir rapport)
5. [ ] Réalisation et description d'une 20ène de requêtes de sélection avec des niveaux de difficultés différents *(filtrage, projection, aggregate)*
6. [ ] Réalisation et description d'une 10ène de requêtes de modifications/suppressions avec des niveaux de difficultés différents
7. [ ] Réalisations et description d'une 10ène de scripts nodejs connectés à la base *(scripts d'administration, requêtes, tests)*
8. [ ] Réalisations, démonstrations et documentation du concept d'index
9. [ ] BONUS : comparaison avec une base SQL, à la fois en termes de structure *(normalisé/dénormalisé)* et en terme d'efficacité *(tests d'accès/modification sur des données générées en masse)*