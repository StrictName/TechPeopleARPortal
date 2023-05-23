import firebaseConfig from "../firebaseconfig";
import React, { useEffect, useState } from "react";
import Entry from "./Entry";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

import {
  collection,
  addDoc,
  setDoc,
  getDocs,
  where,
  query,
} from "firebase/firestore"; // import collection and addDoc functions from Firestore

function Home() {
  const [userId, setUserId] = useState("");
  const [text, setText] = useState("");
  const [pokemon, setPokemon] = useState(0);
  const [entries, setEntries] = useState([]);
  const [userIdGet, setUserIdGet] = useState(0);
  let navigate = useNavigate();

  useEffect(() => {
    if (
      localStorage.getItem("UI") == null ||
      localStorage.getItem("DN") == null
    ) {
      setTimeout(() => {
        return navigate("/signup");
      }, 1000);
    }
  }, []);

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleUserIdGetChange = (event) => {
    setUserIdGet(event.target.value);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const parseInteger = (num) => {
    let str = num.toString();
    str = str.padStart(3, "0");
    return str;
  };

  const add = async () => {
    const usersRef = collection(firebaseConfig.db, "entries");
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

  const get = async () => {
    setEntries([]);
    const entriesRef = collection(firebaseConfig.db, "entries");
    console.log(userIdGet);

    const q = query(
      entriesRef,
      where("user_id", "==", localStorage.getItem("UI"))
    );
    console.log(userIdGet);
    // const querySnapshot =
    //   userIdGet === "" || userIdGet === 0
    //     ? await getDocs(entriesRef)
    //     : await getDocs(q);

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().text}`);
      setEntries((entries) => [...entries, doc.data()]);
    });
    console.log(entries);
  };

  return (
    <div className="flex flex-col">
      <Header />
      <div className="bg-[#094B83] flex flex-col py-8 w-screen">
        <p className="self-center text-white p-3 text-2xl">
          {" "}
          Welcome {localStorage.getItem("DN")}
        </p>
        <p className="self-center text-white p-3">
          {" "}
          Enter a new ID with its corresponding text
        </p>
        {/* <input
          value={userId}
          onChange={handleUserIdChange}
          placeholder="User Id"
          className=" w-1/2 mb-3 h-8 p-2 border rounded self-center "
        /> */}

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
                className="w-full max-w-xs"
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
      <div className="flex flex-col ">
        <div className="flex flex-col place-items-center ">
          <p className="text-white font-semibold pt-10 pb-3 text-sm md:text-base ">
            Enter the ID from which you want to obtain information
          </p>
          {/* <input
            value={userIdGet === 0 ? "" : userIdGet}
            onChange={handleUserIdGetChange}
            placeholder="User Id"
            className="w-1/4 mb-3 h-8  border rounded mr-3 px-3 justify-center"
          /> */}
          <button
            className=" bg-[#545454] hover:bg-[#539ddb] text-white font-bold md:text-base text-xs md:py-3 md:px-4 py-2 px-3 rounded border-white "
            onClick={() => get()}
          >
            Get Data
          </button>
        </div>

        {entries.length !== 0 ? (
          <table className="border-2 border-solid border-collapse border-stone-500 bg-[#f7f5f5] mt-25 mx-5">
            <th className="border-1 border-solid border-stone-500">Data</th>
            <th className="border-1 border-solid border-stone-500">Image</th>

            {entries.length !== 0 ? (
              entries.map((entry) => {
                return (
                  <Entry
                    text={entry.text}
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
