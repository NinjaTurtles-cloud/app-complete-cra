import { useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import colors from "../../utils/style/color";

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

function Survey() {
  const { questionNumber } = useParams();
  const questionNumberInt = parseInt(questionNumber);
  const previousQuestionNumber =
    questionNumberInt === 1 ? 1 : questionNumberInt - 1;
  const nextQuestionNumber = questionNumberInt + 1;

  const [questions, setQuestions] = useState({});
  const [surveyData, setSurveyData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8000/survey`).then((response) =>
      response
        .json()
        .then(({ surveyData }) => console.log(surveyData))
        .catch((error) => console.log(error))
    );
  }, []);

  return (
    <SurveyContainer>
      <QuestionTitle>Questionnaire {questionNumber}</QuestionTitle>
      <QuestionContent>{surveyData[questionNumber]}</QuestionContent>
      <LinkWrapper>
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
      </LinkWrapper>
    </SurveyContainer>
  );
}

export default Survey;
