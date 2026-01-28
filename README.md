# GeoGoat - Contexte Technique

## Produit final
Je crée un jeu de géographie qui sera une application mobile pour iOS et Android. Le jeu se veut à la fois éducatif et fun. Les utilisateurs pourront apprendre les localisations de pays, les drapeaux et les capitales en essayant de les trouver sur le globe terrestre. La DA de l'application sera intuitive et moderne, à mi-chemin entre une appli éducative et un jeu vidéo. Le globe terrestre notamment, sera l'élément visuel le plus important. Il doit être beau (semi réaliste stylisé) et les interactions avec lui impeccables (zoom, fly to, click, rotation avec le doigt ...)
Je proposerai une logique Freemium.

## Stack & Infra
- React Native + Expo
- React Three Fiber
- Repo: https://github.com/LouisHocquet/GeoGoat

## Fonctionnalités implémentées
- ✅ Globe 3D rotatif
- ✅ Gestion zoom
- ✅ Création d'un jeu de données de test (3 pays)
- ✅ Conversion données GeoJSON en points 3D
- ✅ Déclenchement d'une alerte au tap sur un pays
- ✅ Affichage des frontières

## Architecture clés
- GlobeScene : src/components/GlobeScene.tsx
- Globe: src/components/Globe.tsx
- Rotation et zoom: useGesture hook
- Tap : useCountryDetection hook
- Données pays: src/data/countries.json

## Problèmes connus


## Prochaine étape
- ⏭️ Implémenter le système d'overlay (pouvoir colorer un pays dans une couleur donnée au tap par exemple)

## Étapes suivantes
- ⏭️ Mettre en place les étapes de déroulement du jeu
- ⏭️ Créer les composants d'interface prompt (indiquer le pays à trouver) et validation (confirmer la sélection du pays)
- ⏭️ Intégrer le tout ensemble pour avoir la boucle de jeu en place : réaliser un quiz sur les pays de test
