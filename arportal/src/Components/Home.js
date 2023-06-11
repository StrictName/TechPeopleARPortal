import firebaseConfig from "../firebaseconfig";
import React, { useEffect, useState } from "react";
import Entry from "./Entry";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, getDocs, where, query } from "firebase/firestore";

function Home() {
  const [text, setText] = useState("");
  // Pokemon number
  const [pokemon, setPokemon] = useState(0);
  const [entries, setEntries] = useState([]);
  // Entry data and entry id need to be managed separately because db returns them as 2 elements
  const [entriesIds, setEntriesIds] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    if (
      localStorage.getItem("UI") == null ||
      localStorage.getItem("DN") == null
    ) {
      setTimeout(() => {
        return navigate("/signup");
      }, 1000);
    }
  }, []);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  // Pokemon number needs to be in the following format: 001, 010, 100
  const parseInteger = (num) => {
    let str = num.toString();
    str = str.padStart(3, "0");
    return str;
  };

  // Add entry to Firestore
  const add = async () => {
    const usersRef = collection(firebaseConfig.db, "entries");

    // Only consider the first 700 Pokemon
    const pokemonNum = Math.floor(Math.random() * 700);

    try {
      const docRef = await addDoc(usersRef, {
        user_id: localStorage.getItem("UI"),
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

  // Get entries from Firestore
  const get = async () => {
    setEntries([]);
    const entriesRef = collection(firebaseConfig.db, "entries");

    const q = query(
      entriesRef,
      where("user_id", "==", localStorage.getItem("UI"))
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().text}`);
      // Storing entry data
      setEntries((entries) => [...entries, doc.data()]);
      // Storing entry id
      setEntriesIds((entriesIds) => [...entriesIds, doc.id]);
    });
    console.log(entries);
  };

  return (
    <div className="flex flex-col">
      <Header />
      <div className="bg-[#094B83] flex flex-col py-8 w-screen">
        <p className="self-center text-white p-3 text-2xl text-center">
          {" "}
          Welcome {localStorage.getItem("DN")}
        </p>
        <p className="self-center text-white p-3">
          {" "}
          Enter a new ID with its corresponding text
        </p>

        <input
          value={text}
          onChange={handleTextChange}
          placeholder="Text"
          className="w-1/2 mb-3 h-8 p-2 border rounded self-center"
        />

        <button
          className="bg-[#545454] hover:bg-[#539ddb] text-white font-bold md:text-base text-xs md:py-3 md:px-4 py-2 px-3 rounded self-center border-white"
          onClick={() => add()}
        >
          Send
        </button>
      </div>
      <div className="flex justify-center mb-6 bg-[#094B83] w-screen">
        {pokemon !== 0 ? (
          <div className="">
            <p className="mb-3 text-center text-white font-semibold">
              Given Pokemon Index: {pokemon}
            </p>
            <a
              href={`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${parseInteger(
                pokemon
              )}.png`}
              download
            >
              <img
                className="w-full max-w-xs p-4"
                src={`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${parseInteger(
                  pokemon
                )}.png`}
              />
            </a>
            <p className="text-sm text-center text-white">
              {" "}
              Click image to download it{" "}
            </p>
          </div>
        ) : (
          <p className="text-center text-white ">
            {" "}
            Click 'Send' to get a Pokemon
          </p>
        )}
      </div>
      <div className="flex flex-col p-4 ">
        <div className="flex flex-col place-items-center ">
          <p className="text-white font-semibold pt-10 pb-3 text-sm md:text-base text-center mb-2 ">
            Enter the ID from which you want to obtain information
          </p>

          <button
            className=" bg-[#545454] hover:bg-[#539ddb] text-white font-bold md:text-base text-xs md:py-3 md:px-4 py-2 px-3 rounded border-white mb-6 "
            onClick={() => get()}
          >
            Get Data
          </button>
        </div>

        {entries.length !== 0 ? (
          <table className=" border-collapse  bg-[#f7f5f5] mt-25 w-full max-w-3xl mx-auto">
            <th className=" bg-[#545454] text-slate-50 text-left p-2 ">Data</th>
            <th className=" bg-[#545454] text-slate-50 text-left p-2">Image</th>

            {entries.length !== 0 ? (
              entries.map((entry, index) => {
                return (
                  <Entry
                    even={index % 2 == 0}
                    text={entry.text}
                    docId={entriesIds[index]}
                    pokemon={parseInteger(entry.pokemon)}
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

export default Home;
