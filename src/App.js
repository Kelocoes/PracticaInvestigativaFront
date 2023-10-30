import './App.css';
import MainInfo from './Components/MainInfo/MainInfo';
import React, { useState }  from 'react';
import CardList from './Components/CardList/CardList';
import Timer from './Components/Timer/Timer';

function App() {
  const [response, setResponse] = useState(null)
  const [emotions, setEmotions] = useState([])
  const [randomCount, setRandomCount] = useState(0);
  const [score, setScore] = useState(0);

  return (
    <div className="App">
      <header className="App-header">  
        <MainInfo 
          response={response}
          setResponse={setResponse}
        />
        <Timer 
          setScore={setScore}
          score={score}
          setEmotions={setEmotions}
          randomCount={randomCount}
          setRandomCount={setRandomCount}
        />
        <CardList
          setScore={setScore}
          response={response} 
          emotions={emotions} 
        />
      </header>
    </div>
  );
}

export default App;
