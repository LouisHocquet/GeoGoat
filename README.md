# GeoGoat - Contexte Technique

## Produit final
Je crée un jeu de géographie qui sera une application mobile pour iOS et Android. Le jeu se veut à la fois éducatif et fun. Les utilisateurs pourront apprendre les localisations de pays, les drapeaux et les capitales en essayant de les trouver sur le globe terrestre. La DA de l'application sera intuitive et moderne, à mi-chemin entre une appli éducative et un jeu vidéo. Le globe terrestre notamment, sera l'élément visuel le plus important. Il doit être beau (semi réaliste stylisé) et les interactions avec lui impeccables (zoom, fly to, click, rotation avec le doigt ...)
Je proposerai une logique Freemium.

## Objectif
Publier l'application sur iOS (brique de paiement incluse) début Mars et monter en compétence le React Native en parallèle.

## Stack & Infra
- Framework : React Native + Expo
- 3D : React Three Fiber
- Repo: https://github.com/LouisHocquet/GeoGoat

## Fonctionnalités implémentées
- ✅ Globe 3D rotatif
- ✅ Gestion du theme et du Darkmode
- ✅ Gestion zoom
- ✅ Création d'un jeu de données GeoJson de test de 10 pays 
- ✅ Affichage des meshs pays sur le Globe à partir du GeoJSON
- ✅ Déclenchement d'une alerte au tap sur un pays

## Architecture clés
- GlobeScene : src/components/GlobeScene.tsx
- Globe: src/components/Globe.tsx
- Rotation et zoom: useGesture hook
- Création des mesh pays + gestion du tap : CountryMeshes.tsx
- Données pays: src/data/countries.json

## Problèmes connus
- z-fighting entre les mesh pays et le globe

## Prochaine étape
- ⏭️ Créer les composants d'interface prompt (indiquer le pays à trouver) et validation (confirmer la sélection du pays)
- ⏭️ Mettre en place les étapes de déroulement du jeu
- ⏭️ Intégrer le tout ensemble pour avoir la boucle de jeu en place : réaliser un quiz sur les pays de test

## Étapes suivantes
- ⏭️ Affichage des frontières
- ⏭️ Afficher les résultats du quizz à l'utilisateur
- ⏭️ Stocker dans la mémoire du téléphone les pays maîtrisés, les pays ratés par l'utilisateur
- ⏭️ Afficher sur le globe l'avancement d'apprentissage de l'utilisateur par un code couleur sur les mesh pays
- ⏭️ Résoudre le z-fighting globe / Mesh Pays
