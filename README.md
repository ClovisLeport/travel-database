# BDvoyage

Ce projet contient une base de données pour la gestion des voyages, des personnes, des trajets, des avis, et des véhicules.


## Fichiers principaux

- **algo.py** : Contient des algorithmes pour traiter les données.
- **commande.js** : Contient des commandes MongoDB pour interroger la base de données.
- **requete.js** : Contient des requêtes MongoDB.
- **Personne.json** : Contient les données des personnes.
- **Trajet.json** : Contient les données des trajets.
- **Shéma.drawio** : Contient le schéma de la base de données.

## Installation

1. Clonez le dépôt :
    ```sh
    git clone https://gitlab.univ-nantes.fr/E226752U/bdvoyage.git
    cd bdvoyage
    ```

2. Installez les dépendances nécessaires (si applicable).

## Utilisation

### Exécution des scripts

- Pour exécuter les scripts Python :
    ```sh
    python algo.py
    ```

- Pour exécuter les commandes MongoDB, utilisez un client MongoDB comme `mongo` ou `mongosh` et exécutez les scripts `.js` :
    ```sh
    mongo < commande.js
    ```

### Accès à la base de données

Les informations d'accès à la base de données sont stockées dans le fichier [mdp.txt](http://_vscodecontentref_/11) :

Serveur 172.19.0.2::27017

Autantification user : s4a15 mp : s4a15 db : s4a15

SSH 172.26.82.70::22 user : tdmongo mp : tdmongo



