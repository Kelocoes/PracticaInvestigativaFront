import './App.css';
import MainGame from './Components/MainFrame/MainGame';
import React, { useState }  from 'react';
import CardList from './Components/CardList/CardList';
import Timer from './Components/Timer/Timer';

function App() {
  const [response, setResponse] = useState(null)
  const [emotions, setEmotions] = useState([])

  return (
    <div className="App">
      <header className="App-header">  
        <MainGame 
          response={response}
          setResponse={setResponse}
          emotions={emotions}
          setEmotions={setEmotions}
        />
        <Timer/>
        <CardList response={response} emotions={emotions} />
      </header>
    </div>
  );
}

export default App;
