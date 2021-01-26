import db from '../db.json';

import { BackgroundImage, QuizContainer } from '../src/components/Home/styles';
import { 
  Widget,
  Header,
  Content
} from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';

export default function Home() {
  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Header>
            <h1>{db.title}</h1>
          </Header>
          <Content>
            <p>{db.description}</p>
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
