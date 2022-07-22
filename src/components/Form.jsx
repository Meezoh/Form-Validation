import { useState, useEffect } from "react";
import Input from "./Input";
import Radio from "./Radio";
import Error from "./Error";
import { TailSpin, Oval, ThreeDots } from "react-loader-spinner";

const Form = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);

  const [validateName, setValidateName] = useState(true);
  const [validateSurname, setValidateSurname] = useState(true);
  const [validateDate, setValidateDate] = useState(true);
  const [validateEmail, setValidateEmail] = useState(true);
  const [emailStatus, setEmailStatus] = useState(true);

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleSurname = (e) => {
    setSurname(e.target.value);
  };
  const handleDate = (e) => {
    setDate(e.target.value);
    setValidateDate(false);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setLoading(true);
  };
  const handleGender = (e) => {
    setGender(e.target.value);
  };

  useEffect(() => {
    if (name.length <= 2 && name != "") {
      setValidateName(false);
    } else {
      setValidateName(true);
    }
    if (surname.length <= 2 && surname != "") {
      setValidateSurname(false);
    } else {
      setValidateSurname(true);
    }
    let myDate = date.split("-");
    const newDate = new Date(myDate[0], myDate[1], myDate[2]);
    const age = Math.round(
      (new Date() - newDate) / (1000 * 60 * 60 * 24 * 365)
    );
    if (age > 17) {
      setValidateDate(true);
    }
  }, [name, surname, date]);

  useEffect(() => {
    email &&
      fetch(
        "https://peaceful-gorge-48410.herokuapp.com/https://extensi.io/api/email-validator.php?email=" +
          email
      )
        .then((res) => res.json())
        .then((result) => {
          setEmailStatus(result.validation_status);
          setLoading(false);
        })
        .catch((err) => console.log(err));
  }, [email]);

  useEffect(() => {
    if (!emailStatus && email != "") {
      setValidateEmail(false);
    } else {
      setValidateEmail(true);
    }
    !email && setLoading(false);
  }, [email, emailStatus]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length <= 2) {
      setValidateName(false);
    } else {
      setValidateName(true);
    }
    if (surname.length <= 2) {
      setValidateSurname(false);
    } else {
      setValidateSurname(true);
    }
    if (!email) setValidateEmail(false);
  };

  return (
    <form className="Form" onSubmit={handleSubmit}>
      <div className="form">
        <Input
          labelProp="Name"
          typeProp="text"
          id="name"
          value={name}
          handler={handleName}
          required
        />
        {!validateName && (
          <Error msg="Name should be greater than 2 characters" />
        )}
        <Input
          labelProp="Surname"
          typeProp="text"
          id="surname"
          value={surname}
          handler={handleSurname}
          required
        />
        {!validateSurname && (
          <Error msg="Surname should be greater than 2 characters" />
        )}
        <Input
          labelProp="Birth date"
          typeProp="date"
          id="date"
          value={date}
          handler={handleDate}
        />
        {!validateDate && <Error msg="Must be older than 18 years" />}
        <Input
          labelProp="Email"
          typeProp="text"
          id="email"
          value={email}
          handler={handleEmail}
        />
        {!validateEmail && <Error msg="Invalid email" />}
        {loading && <ThreeDots color="#007f00" height={40} width={40} />}

        <div onChange={(e) => handleGender(e)}>
          <Radio labelProp="Male" typeProp="radio" id="gender" value="Male" />
          <Radio
            labelProp="Female"
            typeProp="radio"
            id="gender"
            value="Female"
          />
        </div>

        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default Form;
