import { useState } from "react";
import firebaseConfig from "../firebaseconfig";
import {
  collection,
  addDoc,
  setDoc,
  getDocs,
  where,
  query,
  doc,
  set,
  deleteDoc,
} from "firebase/firestore"; // import collection and addDoc functions from Firestore

const Entry = (props) => {
  const [text, setText] = useState(props.text);
  const [deleted, setDeleted] = useState(false);
  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const updateEntry = async () => {
    const docRef = doc(firebaseConfig.db, "entries", props.docId);

    try {
      const response = await setDoc(
        docRef,
        {
          text: text,
        },
        { merge: true }
      );
      console.log("Document written with ID: ", response);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const deleteEntry = async () => {
    const docRef = doc(firebaseConfig.db, "entries", props.docId);
    try {
      const response = await deleteDoc(docRef);
      setDeleted(true);
      console.log("Successful delete");
    } catch (err) {
      console.log(err);
    }
  };

  return deleted ? (
    <></>
  ) : (
    <tr className="">
      <td
        className={`align-top p-4 ${
          props.even ? "bg-[#e7e4e4] " : "bg-[#9fc4e4]"
        }`}
      >
        <div className="flex justify-between h-full flex-wrap">
          <input
            value={text}
            className="bg-transparent outline-none border-none w-4/5"
            onChange={(e) => handleTextChange(e)}
          />
          <div className="w-1/5">
            <button
              onClick={() => updateEntry()}
              className="mr-2 rounded border-indigo-100 px-2 py-1 outline-none"
            >
              Save
            </button>
            <button
              onClick={() => deleteEntry()}
              className="rounded border-indigo-100 px-2 py-1 outline-none"
            >
              Delete
            </button>
          </div>
        </div>
      </td>
      <td
        className={` p-2 w-24 md:w-32 ${
          props.even ? "bg-[#e7e4e4]" : "bg-[#9fc4e4]"
        }`}
      >
        <a
          href={`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${props.pokemon}.png`}
          download
        >
          <img
            className="w-full p-2"
            src={`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${props.pokemon}.png`}
          />
        </a>
        <p className="text-center text-sm -mt-4">Click to download</p>
      </td>
    </tr>
  );
};

export default Entry;
