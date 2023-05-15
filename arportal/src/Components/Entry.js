const Entry = (props) => {
  return (
    <tr className="">
      <td className="border-2 border-solid border-stone-500 w-3 text-center p-2">
        {props.userId}
      </td>
      <td className="border-2 border-solid border-stone-500 align-top p-2">{props.text}</td>
      <td className="border-2 border-solid border-stone-500 w-24">
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
