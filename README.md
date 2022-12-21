# Créer une application complete avec React

## Ce que nous allons voir

### Créer une SPA Robuste

Dans ce tutoriel on vois l'utilité de EsLint et Prettier.
Qu'est ce que EsLint ?
Qu'est ce Prettier ?

Dans ce tutoriel nous avons vu comment installer le routeur de react
Comment faire passer un argument dans le routeur pour faire un questionnaire.
Et que le routeur est un élément important pour l'identification

Nous avons également créé un systeme de pagination pour un questionnaire

Nous avons vu comment donner une valeur par default et ou exiger qu'une props sois requise avec props-type.
CF revoir les props !!!!

Le scope CSS pour designer un composant avec le CSS in JSS a l'aide du package `yarn add styled-components`
https://styled-components.com/
On pourras ainsi Passer une propriété CSS en variable
Créer un composant StyleGlobal
Comment ajouter une pseudoselecteur avec `&:`

### Incorporez des données dans une application React avec les hooks

#### Faire des calls API

Pour faire des call API nous allons utiliser les hook :

- useEffect nous permettra de déclencher le fetch;
- useState permettra de stocker le retour de l'API dans le state

## Ce que l'on fait au cours du MOOC

Création des composant Home et Survey
Installation du routeur avec `yarn add react-router-dom`
Bug quand j'Import du Router et de Route dans `index.js` a la racine du dossier `src` car on est passer a la V6 de React cf Doc https://reactrouter.com/en/main/upgrading/v5

```javascript
import Home from "./pages/Home";
import Survey from "./pages/Survey";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/survey" element={<Survey />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
```

Création du composant Header avec l'import de **Link** de react-router-dom qui se comporte comme une balise anchor
Puis import de **Header** dans le fichier **index.js Source**

```javascript
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav>
      <Link to="/">Accueil</Link>
      <Link to="/survey">Questionnaire</Link>
    </nav>
  );
}

export default Header;
```

Félicitation vous avez réussi à créer un menu, voyons maitenant comment passer un parametre pour une application de questionnaire par exemple.

On commence par définir `questionNumber` dans l'url de la route.

```javascript
<Route path="/survey/:questionNumber" element={<Survey />} />
```

Ensuite on définis le numéro de la question dans le composant **Header**

```javascript
<Link to="/survey/42">Questionnaire</Link>
```

Puis on vas s'aider du hook **useParams** dans le composant **Survey**

```javascript
import { useParams } from "react-router-dom";

function Survey() {
  const { questionNumber } = useParams();

  return (
    <div>
      <h1>Questionnaire 🧮</h1>
      <h2>Question {questionNumber}</h2>
    </div>
  );
}
```

Intégration du composant Error pour créer une erreur quand l'url demandé n'existe pas avec cette route
```javascript<Route path="*" element={<Error />} />`

Integration des composant Freelances et Results
Ajout de la fonctionalité Question Précedents/Suivantes sur le composant Survey

### Indiquez les types de vos props avec les PropTypes

Installation la bibliotheque propType `yarn add prop-types `
pour permettre de déclarer le type de props attendu et de déclencher un warning si ça ne correspond pas.
On peut également éxiger qu'une props en ajoutant _isRequired_ à la suite du type déclaré pour afficher une erreur dans la console en cas d'oublie.

Déclaration du components>Card qui définira l'affichage des information de chaque freelance dans une carte avec la déclaration des propTypes.

```javascript
import PropTypes from "prop-types";

function Card({ label, title, picture }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", padding: 15 }}>
      <span>{label}</span>
      <img src={picture} alt="freelance" height={80} width={80} />
      <span>{title}</span>
    </div>
  );
}

Card.propTypes = {
  label: PropTypes.string,
  title: PropTypes.string.isRequired,
  picture: PropTypes.string,
};

export default Card;
```

Le composant freelances dans la Pages>Freelance contient les data de chaque freelance et utilise la methode map pour les lister.

```javascript
import DefaultPicture from "../../assets/profile.png";

const freelanceProfiles = [
  {
    name: "Jane Doe",
    jobTitle: "Devops",
    picture: DefaultPicture,
  },
  {
    name: "John Doe",
    jobTitle: "Developpeur frontend",
    picture: DefaultPicture,
  },
  {
    name: "Jeanne Biche",
    jobTitle: "Développeuse Fullstack",
    picture: DefaultPicture,
  },
];

function Freelances() {
  return (
    <div>
      <h1>Freelances</h1>
      {freelanceProfiles.map((profile, index) => (
        <Card
          key={`${profile.name}-${index}`}
          label={profile.jobTitle}
          picture={profile.picture}
          title={profile.name}
        />
      ))}
    </div>
  );
}

export default Freelances;
```

#### Définir une props par default.

Au lieu d'utiliser isRequired on peut déclarer une propriété par default soit en assignant une valeur title directement dans la destructuration

```javascript
function Card({ label, title = "montitre par defauult", picture })
```

soit en ayant recours à la déclaration de _Card.defaultProps_ en dessous de _defaultProps_

```javascript
Card.defaultProps = {
  title: "Mon titre par défaut",
};
```

PS il y a d'autre solution recommander pour typer ses props comme **TypeScript** et **Props**

### Scopez votre CSS avec styled components

Depuis quelques années on vois arrivé le CSS in JS pour que **le style soit attaché a un composant spécifique**. Il existe plusieur solution CSS in JS et nous allons nous intéréssé a styled components qui s'installe avec alc ommande
`yarn add styled-components`
Cela nous permet de définire des constante avec une balise HTML et des valeurs CSS qui seront relié a des balise </JSX>
Et on donne le nom de ces constant aux balise JSX
Et si la balise JSX viens d'une bibliotheque on donne une valeur en préfixe et le nom de la balise en arguments.
exemple

```javascript
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  padding: 15px;
  color: #8186a0;
  text-decoration: none;
  font-size: 18px;
  ${(props) =>
    props.$isFullLink &&
    `color: white; border-radium: 30px; background-color:5843E4;`}
`;

function Header() {
  return (
    <nav>
      <StyledLink to="/">Accueil</StyledLink>
      <StyledLink to="/survey/1" $isFullLink>
        Questionnaire
      </StyledLink>
      <StyledLink to="/freelances">Profils</StyledLink>
    </nav>
  );
}

export default Header;
```

Création du dossier utils pour stocker :
color.js : ( pour stocker les couleur dans des variables )
et Atoms.js : ( Pour Stocker le composant de CSS in JS styledLink ) que nous retrouvons dans les composant Componentn >Header et Pages>Home

### Effectuez des Calls Api

On installe une API en local https://github.com/OpenClassrooms-Student-Center/7150606-API-React-intermediaire
Puis on se place dans le dans le dossier qu'on a cloner pour faire un yarn install afin d'ouvrir l'API en local avec un yarn start.

On récupere les question de notre API dans la console a l'aide d'un hook useEffect qui utilise la méthode fetch et on précise un tableau vide.

```javascript
useEffect(() => {
  fetch(`http://localhost:8000/survey`).then((response) =>
    response
      .json()
      .then(({ surveyData }) => console.log(surveyData))
      .catch((error) => console.log(error))
  );
}, []);
```

Puis pour afficher le questionnaire de la console vers notre pageWeb on utilise le hook state

```javascript
const [questions, setQuestions] = useState({});
```

## Note

import react-router-dom. ( qu'est ce que le react router dom ? )

- Link
- UseParams
- BrowserRouter
- Routes
- Route
- Axios
- fetch

### Vocabulaire :

fetch

API :

state local :

hook :

Re-render :

useState : est un hook qui permet d'ajouter un state local dans un composant fonctions.

useEffect : un hook qui permet d'effectuer des action apres le Render de nos composant.

Dans ce tutoriel on créer une application react complete avec :
CRA
Route pour faire des menu
Link pour naviguer dans le menu
Le Hook useParams pour ajouter des parametre dans le menu.

Le Router est au coeur des systeme d'authetification
Si le token est correct, pas de souci, vous récupérez vos données.
En cas d'erreur de token, vous recevez une erreur qui a pour conséquence de vous rediriger automatiquement côté router de React sur la partie non authentifiée avec Redirect.

## todo

Revoir les anciens cours

- mettre en place le state local avec useState
- Declenchez des effets avec UseEffect

## Question :

Qu'est ce que la methode parseInt
Comment traduire

```javascript
const previousQuestionNumber =
  questionNumberInt === 1 ? 1 : questionNumberInt - 1;
```

### Comment fonctionne ce code pour la pagination

```javascript
function Survey() {
  const { questionNumber } = useParams();
  const questionNumberInt = parseInt(questionNumber);
  const previousQuestionNumber =
    questionNumberInt === 1 ? 1 : questionNumberInt - 1;
  const nextQuestionNumber = questionNumberInt + 1;

  return (
    <div>
      <h1>Questionnaire</h1>
      <h2>Question {questionNumber}</h2>
      <Link to={`/survey/${previousQuestionNumber}`}>Précedent </Link>
      {questionNumber === 10 ? (
        <Link to="/results">Résultats</Link>
      ) : (
        <Link to={`/survey/${nextQuestionNumber}`}>Suivants</Link>
      )}
    </div>
  );
}

export default Survey;
```
