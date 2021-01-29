import React, { useState, useEffect } from 'react';

import db from '../db.json';
import { QuizContainer } from '../src/components/QuizContainer/styles';
import { 
  Widget,
  Header,
  Content,
  Topic
} from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import AlternativeForm from '../src/components/AlternativeForm'

function ResultWidget({ results }) {
  return (
    <Widget>
      <Header>
        Loading...
      </Header>

      <Content>
        <p>
          voce acertou
          {' '}
          {results.reduce((somatoriaAtual, resultAtual) => {
            const isAcerto = resultAtual === true;
            return isAcerto ? somatoriaAtual + 1 : somatoriaAtual;
          }, 0)}
          {' '}
          Perguntas
          </p>
        <ul>
          {results.map((result, index) =>
            <li key={`result__${result}`}>
              #{index + 1} results:
              {result === true ? 'Acertou' : 'Errou'}
            </li>
          )}
        </ul>
      </Content>
    </Widget>
  );
}

function LoadingWidget() {
  return (
    <Widget>
      <Header>
        Loading...
      </Header>

      <Content>
        [loading challenge]
      </Content>
    </Widget>
  );
}

function QuestionWidget({ 
  question, 
  totalQuestions,
  questionIndex,
  onSubmit,
  addResult
}) {
  const [selectAlt, setSelectAlt] = useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectAlt === question.answer;
  const hasAltSelected = selectAlt !== undefined;

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setIsQuestionSubmited(true);
    setTimeout(() => {
      addResult(isCorrect);
      onSubmit();
      setIsQuestionSubmited(false);
    }, 3 * 1000);
  }
  return(
    <Widget>
      <Header>
        {/* <h1>{db.title}</h1> */}
        <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
      </Header>
        <img 
          src="" alt="Desc"
          style={{
            width: '100%',
            height: '150px',
            objectFit: 'cover',
          }}
          src={question.image}
        />

      <Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>

        <AlternativeForm onSubmit={onSubmitHandler}>
          {question.alternatives.map((alt, altIndex) => {
            const altId = `alt__${altIndex}`;
            const alternativeStatus = isCorrect ? 'SUCESS' : 'ERROR';
            const isSelected = selectAlt === altIndex;
            return (
              <Topic
                as="label"
                key={altId}
                htmlFor={altId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{display: 'none'}}
                  id={altId}
                  name={questionId}
                  type="radio"
                  onChange={() => setSelectAlt(altIndex)}
                />
                {alt}
              </Topic>
            );
          })}

          <button type="submit" disabled={!hasAltSelected}>CONFIRM</button>

          <p>selected: {`${selectAlt}`}</p>
          {isQuestionSubmited && isCorrect && <p>You're right!</p>}
          {isQuestionSubmited && !isCorrect && <p>You missed!</p>}  
        </AlternativeForm>
      </Content>
    </Widget>
  );
}

const screenStates = {
    QUIZ: 'QUIZ',
    LOADING: 'LOADING',
    RESULT: 'RESULT',
};

export default function QuizPage() {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [results, setResults] = useState([]);
  const totalQuestions = db.questions.length;
  const [questionIndex, setQuestionIndex] = useState(0);
  const question = db.questions[questionIndex];

  function addResult(result) {
    setResults([
      ...results,
      result,
    ])
  }

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  const handleSubmit = () => {
    if ((questionIndex + 1) < totalQuestions ) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />

        {screenState === screenStates.QUIZ && (
          <QuestionWidget 
            question={question} 
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmit}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <ResultWidget results={results} />}
      </QuizContainer>
    </QuizBackground>
  );
}
