import './App.css';
import CameraCanvas from './Components/Webcam/CameraCanvas'
import React, { useState } from 'react';
import CardList from './Components/CardList/CardList'

function App() {
  const [numberOfCards, setNumberOfCards] = useState(0);
  const [response, setResponse] = useState(null)
  const [emotions, setEmotions] = useState([])

  return (
    <div className="App">
      <header className="App-header">  
        <CameraCanvas 
          setNumberOfCards={setNumberOfCards}
          setResponse={setResponse}
          response={response}
          setEmotions={setEmotions}
          >
        </CameraCanvas>
        <CardList 
          numberOfCards={numberOfCards}
          response={response}
          emotions={emotions}
        >
        </CardList>
      </header>
    </div>
  );
}

export default App;
