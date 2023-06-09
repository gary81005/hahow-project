import reactLogo from '../assets/react.svg';
// eslint-disable-next-line import/no-absolute-path
import viteLogo from '/vite.svg';

const Home = () => {
  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <a href="/heroes">Check To See Heroes!</a>
    </div>
  );
};

export default Home;
