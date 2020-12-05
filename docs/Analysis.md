# Analyse

## Contexte

L'Université de Mons héberge une structure que nous avons appelé "Le CLICK".
Cette structure fournit différents services pour aider les entreprises et porteurs de projets innovants.
Afin de réaliser des prototypes, nous y avons créé un FabLab, c'est-à-dire un atelier ouvert au public où chacun et chacune peut utiliser différentes machines de fabrication numérique.
Le FabLab possède son atelier IoT qui possède une réserve d'articles : microcontrôleurs, capteurs et autres éléments électroniques.
Se pose donc la question du rangement.

Le rangement doit permettre de répondre à plusieurs questions.

- Qu'est-ce que j'ai en stock ?
  Quelles sont les références d'articles que je peux utiliser dans mes projets ou proposer à mes visiteurs ?
- Combien m'en reste-t-il ?
  Est-ce que j'ai assez d'éléments pour réaliser mon projet ?
  Est-ce que je dois en recommander lors de ma prochaine commande ?
- Où est-ce que ça se trouve ?
  Idéalement, je dois pouvoir localiser chaque article en moins de 30 secondes.
  Or, le FabLab s'étend sur plusieurs pièces.
  Chaque pièce contient plusieurs armoires.
  Chaque armoire, plusieurs compartiments, boîtes ou autres conteneurs.
  Et j'y ai déjà travaillé suffisamment longtemps pour savoir que dans un lieu comme le FabLab, tout le monde se sert, mais tout le monde ne range pas.
  Je devrai donc être capable de régulièrement et facilement tout remettre à sa place, conteneurs comme articles.

![Local - armoire - conteneur](local-armoire-conteneur.png)

Les articles vont être livrés au CLICK.
Le FabLab Manager devra alors les encoder dans le catalogue s'il s'agit de nouveaux articles.
Il devra ensuite leur trouver une place dans l'un des conteneur.A
Enfin, au fur et à mesure qu'ils seront utilisés dans les projets, les articles sortiront de l'inventaire.

![Flux des articles](flux.png)

## Use cases

![Use cases](../out/docs/use_cases/usecases.svg)

Un seul acteur est identifié : le FabLab manager.
Il n'y a donc probablement pas besoin d'une gestion d'utilisateur.
Si l'application n'est pas accessible depuis l'extérieur, une authentification est également superflue.

Au niveau de la gestion du projet, UC1 et UC2 seront les premiers à réaliser car ils ne dépendent pas d'autres use cases.
UC3, UC4 et UC5 auront certainenement une base commune pour l'affichage de l'information.

## Navigation

![Schéma de navigation](../out/docs/navigation/navigation.svg)

L'application aura une barre de navigation pour aller d'une page à l'autre.
Les listes auront un formulaire de filtrage pour limiter la liste aux éléments recherchés.

Les formulaires, une fois soumis, affiche un nouveau formulaire vide afin de faciliter l'encodage en série.

## Classes

![Diagramme de classes](../out/docs/classes/classes.svg)
