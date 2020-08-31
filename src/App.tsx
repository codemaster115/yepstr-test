import React from "react";
import "./App.css";
import API from "./services/api";
import { cardCompare } from "./utils/compare";
import { Card } from "./types/api";

const NUMBER_OF_CARDS = 52;

function App() {
  const [score, setScore] = React.useState(0);
  const [counter, setCounter] = React.useState(NUMBER_OF_CARDS);
  const [deckID, setDeckID] = React.useState("");
  const [currentCard, setCurrentCard] = React.useState<Card>({
    image: "",
    value: "",
  });

  React.useEffect(() => {
    shuffle();
  }, []);

  const shuffle = () => {
    API.shuffleCards()
      .then((res) => {
        setDeckID(res.deck_id);
        return res.deck_id;
      })
      .then((deck_id) =>
        API.drawCard(deck_id).then((res) => {
          setCurrentCard({
            image: res.cards[0].image,
            value: res.cards[0].value,
          });
          setCounter(res.remaining);
        })
      );
  };

  const handleCardCompare = (isHigher: number): void => {
    if (counter <= 0) {
      alert("Please shuffle the cards to start a new round");
      return;
    }
    API.drawCard(deckID).then((res) => {
      const nextCard = res.cards[0];
      if (cardCompare(nextCard.value, currentCard.value) === isHigher) {
        setScore((score) => score + 1);
      }

      setCurrentCard({
        image: nextCard.image,
        value: nextCard.value,
      });
      setCounter(res.remaining);
    });
  };

  const handleReset = () => {
    setCounter(NUMBER_OF_CARDS);
    setScore(0);
    shuffle();
  };

  const isGameEnded = counter === 0;
  return (
    <div className="App">
      <header className="App-header">
        <h1>Yepstr code assignment</h1>
      </header>
      <section className="App-content">
        <div>
          <span>
            <h2 className="text__score">Score: {score}</h2>
            <p className="text__left"> Cards Left: {counter}</p>
          </span>
        </div>
        <div className="play-section">
          {!isGameEnded && (
            <button onClick={() => handleCardCompare(-1)}>
              Next card will be lower
            </button>
          )}
          <img src={currentCard.image} alt="card" />
          {!isGameEnded && (
            <button onClick={() => handleCardCompare(1)}>
              Next card will be higher
            </button>
          )}
        </div>
        <div>
          {isGameEnded && (
            <button onClick={handleReset}>Start a new Round</button>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
