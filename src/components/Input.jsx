const Input = ({ typeProp, labelProp, id, value, handler }) => {
  return (
    <div className="Input">
      {/* <label htmlFor={id} className="details">
        {labelProp}
      </label>
      <input
        type={typeProp}
        id={id}
        name={id}
        value={value}
        onChange={(e) => handler(e)}
      /> */}
    </div>
  );
};

export default Input;
