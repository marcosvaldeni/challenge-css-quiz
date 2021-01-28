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
  onSubmit
}) {
  const questionId = `question__${questionIndex}`;
  const onSubmitHandler = (e) => {
    e.preventDefault();
    onSubmit();
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

        <form onSubmit={onSubmitHandler}>
          {question.alternatives.map((alt, altIndex) => {
            const altId = `alt__${altIndex}`;
            return (
              <Topic
                as="label"
                htmlFor={altId}
              >
                <input
                  // style={{display: 'none'}}
                  id={altId}
                  name={questionId}
                  type="radio"
                />
                {alt}
              </Topic>
            );
          })}

          <button type="submit">conf</button>
        </form>
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
  const totalQuestions = db.questions.length;
  const [questionIndex, setQuestionIndex] = useState(0);
  const question = db.questions[questionIndex];

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  const handleSubmit = () => {
    if (questionIndex > totalQuestions ) {
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
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <div></div>}
      </QuizContainer>
    </QuizBackground>
  );
}
