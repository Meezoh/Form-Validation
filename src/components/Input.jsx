const Input = ({ typeProp, labelProp, id, value, handler }) => {
  return (
    <div className="Input">
      <div>
        <label htmlFor={id}>{labelProp}</label>
        <input
          type={typeProp}
          id={id}
          name={id}
          value={value}
          onChange={(e) => handler(e)}
        />
      </div>
    </div>
  );
};

export default Input;
