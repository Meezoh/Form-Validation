const Error = ({ msg }) => {
  return (
    <div className="Error">
      <h4 className="error"> {msg}</h4>
      {/* {surname && (
        <h4 className="error">{surname} should be greater than 3 characters</h4>
      )}
      {age && <h4 className="error"></h4>}
      {email && <h4 className="error">Invalid email</h4>} */}
    </div>
  );
};

export default Error;
