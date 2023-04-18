const Entry = (props) => {
  return (
    <tr className="">
      <td className="border-2 border-solid w-3 text-center p-2">
        {props.userId}
      </td>
      <td className="border-2 border-solid align-top p-2">{props.text}</td>
      <td className="border-2 border-solid w-24">
        <a
          href={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${String(
            props.pokemon
          )}.png`}
          download
        >
          <img
            className="w-full"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${String(
              props.pokemon
            )}.png`}
          />
        </a>
        <p className="text-center text-sm -mt-4">Click to download</p>
      </td>
    </tr>
  );
};

export default Entry;
