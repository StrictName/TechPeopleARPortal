import "./App.css";
import firebaseConfig from "./firebaseconfig";
import React, { useState } from "react";

import { collection, addDoc } from "firebase/firestore"; // import collection and addDoc functions from Firestore

function App() {
  const [userId, setUserId] = useState("");
  const [text, setText] = useState("");
  const [pokemon, setPokemon] = useState(0);

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const add = async () => {
    const usersRef = collection(firebaseConfig.db, "users");
    const pokemonNum = Math.floor(Math.random() * 151);

    try {
      const docRef = await addDoc(usersRef, {
        user_id: parseInt(userId),
        text: text,
        pokemon: pokemonNum,
      });
      console.log("Document written with ID: ", docRef.id);
      setPokemon(pokemonNum);
      console.log(pokemon);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  
  return (
    <div>
      <h1>TechPeopleAR</h1>
      <input
        value={userId}
        onChange={handleUserIdChange}
        placeholder="User Id"
      />
      <input value={text} onChange={handleTextChange} placeholder="Text" />

      <button onClick={() => add()}>Send</button>
      <div>
        Given Pokemon: {pokemon}
        {pokemon !== 0 ? (
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${String(
              pokemon
            )}.png`}
          />
        ) : (
          <p>Send data to get Pokemon</p>
        )}
      </div>
    </div>
  );
}

export default App;