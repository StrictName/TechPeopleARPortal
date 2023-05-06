import { useState } from "react";

const Element = () => {
  const [counter, setCounter] = useState(1);

  return (
    <div className="max-w-md flex flex-wrap">
      <h1 className="w-full text-center">Calculator</h1>
      <button className="w-2/3" onClick={() => setCounter(counter * 2)}>
        {" "}
        Times two{" "}
      </button>
      <button className="w-2/3" onClick={() => setCounter(counter / 2)}>
        {" "}
        Divided by two{" "}
      </button>
      <p className="w-full">
        But I can’t knock creativity and an attempt at something new. The Tour
        Pro 2 don’t measure up to the best earbud contenders when it comes to
        sound, but they definitely have a unique gimmick. They’re offbeat and
        weird. Let’s keep getting weird. Something good has to come out of that.
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
