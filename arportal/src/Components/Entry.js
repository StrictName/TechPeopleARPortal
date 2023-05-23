const Entry = (props) => {
  return (
    <tr className="">
      <td
        className={`align-top p-4 ${
          props.even ? "bg-[#e7e4e4] " : "bg-[#9fc4e4]"
        }`}
      >
        {props.text}
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
