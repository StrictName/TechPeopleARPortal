import { useState } from "react";

const Card = () => {
  const [counter, setCounter] = useState(1);

  return (
    <div className="max-w-md flex flex-wrap">
      <h1 className="w-full text-center"></h1>
      <p className="w-full">
        This concept isn’t going to begin and end with JBL — or HP, for that
        matter. I predict we’ll see others try their hand at “smart” earbud
        cases. Truthfully, no idea has ever struck me as more Samsung, but I
        suppose the Galaxy Watch lineup covers similar bases. Maybe someone will
        figure out a brilliant reason for earbuds to have a screen. For now,
        this feels like one screen too many.
      </p>
      <button className="w-2/3" onClick={() => setCounter(counter + 1)}>
        {" "}
        Plus{" "}
      </button>
      <button className="w-2/3" onClick={() => setCounter(counter - 1)}>
        {" "}
        Minus{" "}
      </button>

      <p className="w-full text-center">Result: {counter} </p>
    </div>
  );
};