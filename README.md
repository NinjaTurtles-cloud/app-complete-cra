# Créer une application complete avec React

Dans ce tutoriel nous allons voir le routing

Créer un systeme de pagination pour un questionnaire

Les porps types pour définir une valeur par default, ou si une props est required

Le scope CSS pour designer un composange en JS avec `yarn add styled-components`

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

## Scopez votre CSS avec styled components

Depuis quelques années on vois arrivé le CSS in JS pour gargé à l'idée que **le style est attacgé a un composant spécifique**. Il existe plusieur solution CSS in JS et nous allons nous intéréssé a styled components qui s'installe avec alc ommande
`yarn add styled-components`
Puis on définis des constante avec des valeurs CSS
Et on donne le nom de ces constant aux balise JSX
Et si la balise JSX viens d'une bibliotheque on donne une valeur en préfixe et le nom de la balise en arguments.
exemple

````javascript
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledLink = styled(Link)`
    padding: 15px;
    color: #8186a0;
    text-decoration: none;
    font-size: 18px;
    ${(props) =>
      props.$isFullLink &&
      `color: white; border-radium: 30px; background-color:5843E4;`}
`

function Header() {
    return (
        <nav>
            <StyledLink to="/">Accueil</StyledLink>
            <StyledLink to="/survey/1" $isFullLink>Questionnaire</StyledLink>
            <StyledLink to="/freelances">Profils</StyledLink>
        </nav>
    )
}

export default Header
```


# Note

import react-router-dom. ( qu'est ce que le react router dom ? )

- Link
- UseParams
- BrowserRouter
- Routes
- Route

Dans ce tutoriel on créer une application react complete avec :
CRA
Route pour faire des menu
Link pour naviguer dans le menu
Le Hook useParams pour ajouter des parametre dans le menu.

Le Router est au coeur des systeme d'authetification
Si le token est correct, pas de souci, vous récupérez vos données.
En cas d'erreur de token, vous recevez une erreur qui a pour conséquence de vous rediriger automatiquement côté router de React sur la partie non authentifiée avec Redirect.

# Question

Qu'est ce que la methode parseInt
Comment traduire

```javascript
const previousQuestionNumber =
  questionNumberInt === 1 ? 1 : questionNumberInt - 1;
```
````

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
