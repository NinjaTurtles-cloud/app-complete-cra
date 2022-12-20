import { useParams, Link } from "react-router-dom";

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
      <Link className="basic" to={`/survey/${previousQuestionNumber}`}>
        Précedents{" "}
      </Link>
      {questionNumber === 10 ? (
        <Link to="/results">Résultats</Link>
      ) : (
        <Link className="basic" to={`/survey/${nextQuestionNumber}`}>
          {" "}
          Suivants
        </Link>
      )}
    </div>
  );
}

export default Survey;
