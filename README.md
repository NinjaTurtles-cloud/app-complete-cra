# Créer une application complete avec React

Ce repo viens du cours open class room créer une application complete avec React.
Dois voici un bref résumé des différents chapitre qu'il compose.

## Créer une SPA Robuste

### Architecturer le projet

On commence par paramétrer les extenssions EsLint et Prettier pour afficher les erreurs et warning dans le code et pour formatter le code.

### Créer une SPA avec le routeur

Ensuite nous avons créer une SPA en installant le routeur de react, `yarn add react-router-dom`,
nous avons vu comment passer un argument dans le routeur et l'url pour faire un questionnaire avec un systeme de pagination avec `useParams()`
puis nous appris que le routeur est un élément important pour une fonctionalité d'authentification.
Et on a également créer une page d'erreur 404 avec une route qui les attrapes toutes.

### Les props types

Et nous avons vu comment donner une valeur par default et ou exiger qu'une props sois requise avec `yarn add prop-type` en créant des card avec des valeur par default pour la propriété title, label et picture.
CF revoir les props !!!!

### Le CSS in JS

On vas scoper le style pour designer un composant avec le CSS in JSS a l'aide du package `yarn add styled-components`
https://styled-components.com/

Nous avons vu qu'un des avantage que cela offre est de passé une propriété CSS directement dans un composant avec l'exemple de `$isFullLink` permettant d'ajouter un background rouge a un élément du menu.

Un autre avantage est de définirs des variable contenant du style avec pour exemple les couleur primary, secondary ...

Puis on a vu comment ajouter une pseudoselecteur avec `&:` pour faire une ombre au survol de la souris sur une card.

On a vu comment créer un composant StyleGlobal dans la racine du projet pour définir une police de caractere.

Et si on veut en savoir plus y a des exemples dans la documentation officiel notamment dans le cas ou un composant a une className https://styled-components.com/docs/basics#pseudoelements-pseudoselectors-and-nesting

### Effectuer des call API

Ensuite on a vu comment récuperer les donné d'une API afin d'afficher les questions du questionnaire et les info des profiles freelances.

Pour faire des call API nous avons utiliser les hook :

- useEffect nous permettra de déclencher le fetch;
- useState permettra de stocker le retour de l'API dans le state

Et qu'il y a 2 syntaxe différentes celle en then et la syntaxe plus récente en async

Puis on a ajouter un loader qui sépare le momement du rendu de la page avec celui ou les data se charge grace a un loader chargé dans Atoms.js

## Incorporez des données dans une application React avec les Hooks

### Incorporez des données avec useContext

Contexte **nous permet de récupérer simplement nos datas sans avoir à tout passer manuellement** en englobant le composant parent dans un _provider_ et accéder au données dans les parents enfants appelé les _consumers_

On a créer un boutton toggle Jour Nuit grace aux ThemeProvider, puis on à récuperer les réponse que l'utilisateur à choisis pour les envoyé a la page Results avec le SurveyProvider.

### Allez plus loin avec les hook

On peut créer des hook personalisé "custom hook" en créant un fonction qui commence par use contenant qui extrait de la logique réutilisable.

On a donc créer le dossier utils/hook contenant le hook useFetch servant a ne pas répéter le code qui fetch la data dans le questionnaire Survey

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
const [surveyData, setSurveyData] = useState({});
const [isDataLoading, setDataLoading] = useState(false);
```

Et on affiche egalment un loader pour mentionner qu'il y a un petit tant de chargement entre le render du composant et celui du chargement des data

Pour cela on ajoute un loader en CSS pure dans le composant util>Atom.js en ajoutant l'import de keyFrames du pack styled-component

```javascript
import colors from "./colors";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
 
    to {
    transform: rotate(360deg);
    }
`;

export const Loader = styled.div`
  padding: 10px;
  border: 6px solid ${colors.primary};
  border-bottom-color: transparent;
  border-radius: 22px;
  animation: ${rotate} 1s infinite linear;
  height: 0;
  width: 0;
`;
```

Et on utilise le state pour afficher notre loader

```javascript
const [isDataLoading, setDataLoading] = useState(false);
```

Et dans le useEffect on vien modifier notre booléen

```javascript
useEffect(() => {
  setDataLoading(true);
  fetch(`http://localhost:8000/survey`)
    .then((response) => response.json())
    .then(({ surveyData }) => {
      setSurveyData(surveyData);
      setDataLoading(false);
    });
}, []);
```

Et une syntaxe plus récente depuis ES7 propose d'utiliser await a la place de then.
Pour cela on part sur cette base

```javascript
useEffect(() => {
  async function fetchSurvey() {
    try {
    } catch (err) {
    } finally {
    }
  }
  fetchSurvey();
}, []);
```

Et on l'a rempli avec le code de base.

```javascript
useEffect(() => {
  async function fetchSurvey() {
    setDataLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/survey`);
      const { surveyData } = await response.json();
      setSurveyData(surveyData);
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setDataLoading(false);
    }
  }
  fetchSurvey();
}, []);
```

Puis on **conditionne le rendu du composant** `loader`

```javascript
<SurveyContainer>
  <QuestionTitle>Question {questionNumber}</QuestionTitle>
  {isDataLoading ? (
    <Loader />
  ) : (
    <QuestionContent>{surveyData[questionNumber]}</QuestionContent>
  )}
  ...
</SurveyContainer>
```

### Transmettre des donnée avec le hook usecontext

On créer le composant Footer pour y insérer notre Button Night Mode

On insère le composant Footer et le Theme provider dans notre index.js source

On créer le fichier utils/Context pour initilaliser le contexte puis on le paramètre

Et on import le ThemeProvider dans index.js source pour englober notre code

```javascript
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

Ainsi toute les valeur englober dans les balises <ThemeProvider> auront acces a theme et setTheme.

On créer un composant utils/style/GlobaStyle pour y inserer notre styled.component globaleStle en fonction afin d'y utiliser un Hook et on y importe useContext et ThemeContext  
Et on récupere le theme et on y insere une prop isDarkMode.

Puis on retourne sur notre button dans le composant Footer afin d'y importer ThemeContext et useContext pour récuperer nos action Theme et toggleTheme

---

Ensuite on créer le SurveyContainer pour récuperer les réponses du Questionnaire.

Pour cela on commence par créer le SurveyProvider dans utils/Context sans oublié de le déclarer dans le index.js source

```javascript
export const SurveyContext = createContext();

export const SurveyProvider = ({ children }) => {
  const [answers, setAnswers] = useState({});
  const saveAnswers = (newAnswers) => {
    setAnswers({ ...answers, ...newAnswers });
  };

  return (
    <SurveyContext.Provider value={{ answers, saveAnswers }}>
      {children}
    </SurveyContext.Provider>
  );
};
```

Ensuite on importe useContext from react et
{ surveycontext } from ....utils/Context Survey/index.js

On créer les style.components ReplyBox et ReplyWrapper

Puis dans la fonction Survey on déclare notre constante { answers, saveAnswers } qui utilise SurveyContext

Et on créer la fonction saveReply(answer)

Puis on return les composant ReplyWrapper et ReplyBox qui selectionne la réponse au clique

```javascript
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import colors from "../../utils/style/Colors";
import { Loader } from "../../utils/style/Atoms";
import { SurveyContext } from "../../utils/Context";

const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QuestionTitle = styled.h2`
  text-decoration: underline;
  text-decoration-color: ${colors.primary};
`;

const QuestionContent = styled.span`
  margin: 30px;
`;

const LinkWrapper = styled.div`
  padding-top: 30px;
  & a {
    color: black;
  }
  & a:first-of-type {
    margin-right: 20px;
  }
`;

const ReplyBox = styled.button`
  border: none;
  height: 100px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.backgroundLight};
  border-radius: 30px;
  cursor: pointer;
  box-shadow: ${(props) =>
    props.isSelected ? `0px 0px 0px 2px ${colors.primary} inset` : "none"};
  &:first-child {
    margin-right: 15px;
  }
  &:last-of-type {
    margin-left: 15px;
  }
`;

const ReplyWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

function Survey() {
  const { questionNumber } = useParams();
  const questionNumberInt = parseInt(questionNumber);
  const prevQuestionNumber =
    questionNumberInt === 1 ? 1 : questionNumberInt - 1;
  const nextQuestionNumber = questionNumberInt + 1;
  const [surveyData, setSurveyData] = useState({});
  const [isDataLoading, setDataLoading] = useState(false);
  const { answers, saveAnswers } = useContext(SurveyContext);
  const [error, setError] = useState(false);

  function saveReply(answer) {
    saveAnswers({ [questionNumber]: answer });
  }

  useEffect(() => {
    async function fetchSurvey() {
      setDataLoading(true);
      try {
        const response = await fetch(`http://localhost:8000/survey`);
        const { surveyData } = await response.json();
        setSurveyData(surveyData);
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setDataLoading(false);
      }
    }
    fetchSurvey();
  }, []);

  if (error) {
    return <span>Oups il y a eu un problème</span>;
  }

  return (
    <SurveyContainer>
      <QuestionTitle>Question {questionNumber}</QuestionTitle>
      {isDataLoading ? (
        <Loader />
      ) : (
        <QuestionContent>{surveyData[questionNumber]}</QuestionContent>
      )}
      <ReplyWrapper>
        <ReplyBox
          onClick={() => saveReply(true)}
          isSelected={answers[questionNumber] === true}
        >
          Oui
        </ReplyBox>
        <ReplyBox
          onClick={() => saveReply(false)}
          isSelected={answers[questionNumber] === false}
        >
          Non
        </ReplyBox>
      </ReplyWrapper>

      <LinkWrapper>
        <Link to={`/survey/${prevQuestionNumber}`}>Précédent</Link>
        {surveyData[questionNumberInt + 1] ? (
          <Link to={`/survey/${nextQuestionNumber}`}>Suivant</Link>
        ) : (
          <Link to="/results">Résultats</Link>
        )}
      </LinkWrapper>
    </SurveyContainer>
  );
}

export default Survey;
```

Et pour finir on récupere le resutat des réponses donné dans la console dans la page/Result

en important useContext et SurveySontext
Et en déclarant la const { answers } qui utilise le usecontext dans la fonction Result et en logant la const answer dans la console

```javascript
//Result.js
import { useContext } from "react";
import { SurveyContext } from "../../utils/Context";

function Results() {
  const { answers } = useContext(SurveyContext);
  console.log(answers);

  return (
    <div>
      <h1>Résultats</h1>
    </div>
  );
}

export default Results;
```

### créer un hook personalisé

On créer le hook useFetch dans utils/Hook ce qui permet de mettre en parametre les différents parametre et envoyer les parametre avec seuelement 2 ligne de code.

Ensuite récupere le Resultat du questionnaire dans result.

l'url prend la chaine de caractere queryParams afin de définir le resultat a affiché. ex a1=0&a2=1 ( pour la question a1 l'utlisateur a repond non et pour la question 2 l'utilisateur a repondu oui ) ...

Pour générerer le resultat on utilise la fonction **formatQueryParams(answers)** qui récupere l'objet answers et itère les réponse avec la méthode reduce et concatène une string

```javascript
function formatQueryParams(answers) {
  const answerNumbers = Object.keys(answers);

  return answerNumbers.reduce((previousParams, answerNumber, index) => {
    const isFirstAnswer = index === 0;
    const separator = isFirstAnswer ? "" : "&";
    return `${previousParams}${separator}a${answerNumber}=${answers[answerNumber]}`;
  }, "");
}
```

Puis on récupere la data si elle est chargé sans erreur et on utilise useFetch où on passe l'url + queryParams

```javascript
const { data, isLoading, error } = useFetch(
  `http://localhost:8000/results?${queryParams}`
);
```

Dans la const queryParams

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

State management : L'art d'optimiser la gestion du state soit de passer des simplements des datas dans nos composant

UseContext : Hook pour gerer le state

Provider :

Consumers :

## todo

Revoir les anciens cours

- mettre en place le state local avec useState
- Declenchez des effets avec UseEffect

## Question :

ça veux dire quoi parser ?

a quoi sert isLoading ?

Qu'est ce que les hook

- useEffect,
- useState
- useContext ?

Qu'est ce que l'import de keyFrame from styled-component ( cf Atom.js )

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

### Incorporez des donnée
