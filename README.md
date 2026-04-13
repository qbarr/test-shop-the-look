# Projet – Shop The Look
  
J’ai ajouté trois looks, et la page « Shop The Look » est accessible depuis le menu du header.  

Tout est détaillé dans les commentaires des fichiers sources. Je réexplique ici mes choix pour que vous compreniez mieux (il ne s’agit donc pas uniquement de commentaires de code de production, mais j’ai trouvé cela plus pertinent dans le cadre de ce test). J’ai écrit mes commentaires en français.  

## Choix techniques du projet

### Architecture JS  
Je me suis basé sur une architecture que j’utilise souvent sur ce type de projet avec rendu côté serveur (pas de SPA).  

Elle me permet habituellement d’avoir un ressenti plus “SPA-like” et une plus grande flexibilité sur les animations, d’avoir des composants JS modulaires, des transitions / injections de pages en AJAX, ainsi qu’une gestion via différents routeurs selon le type de page.  

J’utilise ici une version extrêmement simplifiée (pas de store, pagemanager, etc.), car le scope est limité aux pages look et shop-the-look.  

Cette architecture me permet de bien segmenter toutes les logiques du site à tous les niveaux (navigation, composants, core, etc.).  

### Architecture CSS  
Je regroupe tout dans le bundle global dans le cadre du test.  

Idéalement, j’aurais importé chaque fichier SCSS dans le JS correspondant pour ne pas alourdir le CSS de chaque page. Cela fonctionne particulièrement bien lorsque toute la navigation du site est gérée en AJAX, avec un système d’affichage/masquage des pages.  

Je préfère éviter de tout mettre dans le stylesheet Liquid, car je trouve cela moins facile à maintenir.  

## Choix UX  

Pour la page look, je suis resté assez simple dans le cadre du test. Quand un produit a plusieurs variantes, j’ajoute automatiquement la première disponible. Le bouton “ajouter au panier” ajoute tous les produits d’un coup.  

J’ai essayé de rester au plus proche du thème Horizon (un peu comme sur la PDP), en gardant une approche minimaliste par rapport à la spec donnée.  

Je n’ai pas ajouté de message d’erreur comme sur la PDP, puisque ce n’était pas précisé.  
