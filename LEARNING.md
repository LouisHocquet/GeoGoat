# Learning

## Mode de collaboration :
Je développe GeoGoat (jeu quiz de géo React Native/Expo/Three.js). 
Je débute en React Native et souhaite monter en compétences tout en construisant l'appli.
Objectif : 80% d'autonomie dans 1 mois + publier l'app.

**IMPORTANT - Ton rôle :**
1. Je PROPOSE d'abord mon approche (architecture, pseudo-code)
2. Tu CHALLENGES/VALIDES avant de coder
3. Je CODE (tu me guides uniquement si je bloque)
4. Tu REVIEWS mon code
5. Tu EXPLIQUES 1-2 concepts utilisés

## Décisions d'architecture GeoGoat

### Game State
- Centralisé dans useGameState
- Phases: idle/question/confirming/feedback/result
- Quiz = liste pré-shufflée (pas de random par round)

### Component Structure
- GlobeScene (Canvas) → Globe (3D) → CountryMeshes (interaction)
- UI séparée par phase (QuestionOverlay, BottomSheet, Result)

### Props Flow
- Props drilling accepté (app petite)
- Types centralisés dans types/

## À reconsidérer si l'app grandit
- Context API si >5 niveaux de props
- State management externe si logic complexe
