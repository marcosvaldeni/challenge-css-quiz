import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import db from '../db.json';
import { QuizContainer, Form } from '../src/components/Home/styles';
import { 
  Widget,
  Header,
  Content,
} from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';

export default function Home() {
  const router = useRouter();
  let [name, setName] = useState('');

  const onChangeHandler = (e) => {
    setName(name = e.target.value);
  }
  const onSubmitHandler = (e) => {
    e.preventDefault();
    router.push(`/quiz?name=${name}`);
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>Challenge CSS Quiz</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet"></link>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Header>
            <h1>{db.title}</h1>
          </Header>
          <Content>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <Form onSubmit={onSubmitHandler}>
              <input 
                placeholder="informe seu nome" 
                onChange={onChangeHandler}
              />
              <button 
                type="submit"
                disabled={name.length === 0}
              >
                Play
              </button>
            </Form>
          </Content>
        </Widget>

        <Widget>
          <Content>
            <h1>Challenge CSS Quiz</h1>

            <p>lorem ipsum dolor sit amet...</p>
          </Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/omariosouto" />
    </QuizBackground>
  );
}
