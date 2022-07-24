const Input = ({ fieldName, type, placeholder, value, handler }) => {
  return (
    <div className="Input">
      <span className="details">{fieldName}</span>
      <input
        type={type}
        placeholder={placeholder}
        onChange={handler}
        value={value}
      />
    </div>
  );
};

export default Input;
