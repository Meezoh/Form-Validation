const Radio = ({ typeProp, labelProp, id, value }) => {
  return (
    <div className="Radio">
      <label htmlFor={id}>{labelProp}</label>
      <input type={typeProp} id={id} name={id} value={value} />
    </div>
  );
};

export default Radio;
