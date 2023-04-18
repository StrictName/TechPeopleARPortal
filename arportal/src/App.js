import firebaseConfig from "./firebaseconfig";
import React, { useEffect, useState } from "react";
import Entry from "./Components/Entry";

import { collection, addDoc, getDocs, where, query } from "firebase/firestore"; // import collection and addDoc functions from Firestore

function App() {
  const [userId, setUserId] = useState("");
  const [text, setText] = useState("");
  const [pokemon, setPokemon] = useState(0);
  const [entries, setEntries] = useState([]);
  const [userIdGet, setUserIdGet] = useState(0);

  // useEffect(() => {
  //   console.log("Changed");
  // }, entries);

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleUserIdGetChange = (event) => {
    setUserIdGet(event.target.value);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const add = async () => {
    const usersRef = collection(firebaseConfig.db, "entries");
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

  const get = async () => {
    setEntries([]);
    const entriesRef = collection(firebaseConfig.db, "entries");
    console.log(userIdGet);

    const q = query(entriesRef, where("user_id", "==", parseInt(userIdGet)));
    console.log(userIdGet);
    const querySnapshot =
      userIdGet === "" || userIdGet === 0
        ? await getDocs(entriesRef)
        : await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().text}`);
      setEntries((entries) => [...entries, doc.data()]);
    });
    console.log(entries);
  };

  return (
    <div className="flex flex-col p-3">
      <h1 className="text-center mb-4">TechPeople AR Portal</h1>

      <input
        value={userId}
        onChange={handleUserIdChange}
        placeholder="User Id"
        className="w-1/2 mb-3 h-7 p-1 border rounded-sm"
      />
      <input
        value={text}
        onChange={handleTextChange}
        placeholder="Text"
        className="w-1/2 mb-3 h-7 p-1 border rounded-sm"
      />

      <button className="w-14 border rounded-sm h-6 mb-3" onClick={() => add()}>
        Send
      </button>
      <div className="flex justify-center mb-6">
        {pokemon !== 0 ? (
          <div className="">
            <p className="mb-3 text-center">Given Pokemon Index: {pokemon}</p>
            <a
              href={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${String(
                pokemon
              )}.png`}
              download
            >
              <img
                className="w-full"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${String(
                  pokemon
                )}.png`}
              />
            </a>
            <p className="text-sm text-center"> Click image to download it </p>
          </div>
        ) : (
          <p className="text-center">Send data to get Pokemon</p>
        )}
      </div>
      <div className="flex flex-col">
        <div>
          <input
            value={userIdGet === 0 ? "" : userIdGet}
            onChange={handleUserIdGetChange}
            placeholder="User Id"
            className="w-1/4 mb-3 h-6 p-1 border rounded-sm mr-3"
          />
          <button
            className="w-20 border rounded-sm h-6 mb-3"
            onClick={() => get()}
          >
            Get Data
          </button>
        </div>

        {entries.length !== 0 ? (
          <table className="border-2 border-solid border-collapse">
            <th className="border-2 border-solid">User ID</th>
            <th className="border-2 border-solid">Text</th>
            <th className="border-2 border-solid">Image</th>

            {entries.length !== 0 ? (
              entries.map((entry) => {
                return (
                  <Entry
                    userId={entry.user_id}
                    text={entry.text}
                    pokemon={entry.pokemon}
                  />
                );
              })
            ) : (
              <p>No data in system please try with another client ID </p>
            )}
          </table>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default App;
