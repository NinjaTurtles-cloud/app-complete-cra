# Créer une application complete avec React

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

```
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

```
<Route path="/survey/:questionNumber" element={<Survey />} />
```

Ensuite on définis le numéro de la question dans le composant **Header**

```
<Link to="/survey/42">Questionnaire</Link>
```

Puis on vas s'aider du hook **useParams** dans le composant **Survey**

```
import { useParams } from 'react-router-dom'

function Survey() {
    const { questionNumber } = useParams()

    return (
        <div>
            <h1>Questionnaire 🧮</h1>
            <h2>Question {questionNumber}</h2>
        </div>
    )
}
```

#Note
Dans ce tutoriel on créer une application react complete avec :
CRA
Route pour faire des menu
Link pour naviguer dans le menu
Le Hook useParams pour ajouter des parametre dans le menu.
