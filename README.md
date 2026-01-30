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
- ✅ Globe 3D utilisé par les pages index et quiz
- ✅ Gestion du theme et du Darkmode
- ✅ Gestion zoom / pan du globe
- ✅ Création d'un jeu de données GeoJson de test de 10 pays
- ✅ Boucle de Jeu Basique : prompt pays à trouver > Tap sur un mesh pays du globe > Confirmation > Feedback UI (correct/incorrect) > Affichage du résultat
- ✅ Affichage des meshs pays sur le Globe à partir du GeoJSON

## Architecture clés
- Menu principal : index.tsx
- Quiz : /quiz/[mode].tsx
- GlobeScene : src/components/GlobeScene.tsx
- Globe: src/components/Globe.tsx
- Rotation et zoom: useGesture hook
- Création des mesh pays + gestion du tap : CountryMeshes.tsx
- Données pays: src/data/countries.json
- Types définis dans le dossier src/types

## Problèmes connus
- z-fighting entre les mesh pays et le globe

## Prochaine étape
- ⏭️ Maîtriser ce qu'on a déjà codé en factorisant et comprenant useGlobeGesture et useGameState (cf LEARNING.md)

## Étapes suivantes
- ⏭️ Déployer build sur TestFlight pour test interne sur mon iPhone
- ⏭️ Affichage des frontières sur le globe
- ⏭️ Intégrer tous les pays du monde
- ⏭️ Affichage des frontières
- ⏭️ Afficher les résultats du quizz à l'utilisateur
- ⏭️ Stocker dans la mémoire du téléphone les pays maîtrisés, les pays ratés par l'utilisateur
- ⏭️ Afficher sur le globe l'avancement d'apprentissage de l'utilisateur par un code couleur sur les mesh pays
- ⏭️ Résoudre le z-fighting globe / Mesh Pays
- ⏭️ Ajouter le mode de jeu capitales du monde
- ⏭️ Ajouter le mode de jeu drapeaux
- ⏭️ Permettre la sélection du mode de jeu
- ⏭️ Mettre en place le système de paiement
- ⏭️ Conditionner l'accès à certains modes de jeu aux utilisateurs premium
- ⏭️ Déployer l'application sur l'appstore
