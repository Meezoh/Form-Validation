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
  const [formData, setFormData] = useState("");
  const [loading, setLoading] = useState(false);

  const [validateName, setValidateName] = useState(true);
  const [validateSurname, setValidateSurname] = useState(true);
  const [validateDate, setValidateDate] = useState(true);
  const [validateEmail, setValidateEmail] = useState(true);
  const [emailStatus, setEmailStatus] = useState(true);
  // const [radioChecked, setRadioChecked] = useState(false);

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
    // Name
    if (name.length <= 2 && name != "") {
      setValidateName(false);
    } else {
      setValidateName(true);
    }

    // Surname
    if (surname.length <= 2 && surname != "") {
      setValidateSurname(false);
    } else {
      setValidateSurname(true);
    }

    // Birth date
    let myDate = date.split("-");
    const newDate = new Date(myDate[0], myDate[1], myDate[2]);
    const age = Math.round(
      (new Date() - newDate) / (1000 * 60 * 60 * 24 * 365)
    );
    if (age > 17 || date == "") {
      setValidateDate(true);
    }

    // Gender
    if (!emailStatus && email != "") {
      setValidateEmail(false);
    } else {
      setValidateEmail(true);
    }
    !email && setLoading(false);
  }, [name, surname, date, email, emailStatus, gender]);

  // Email
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

  // Submit form
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

    if (
      validateName &&
      name != "" &&
      validateSurname &&
      surname != "" &&
      validateEmail &&
      email != "" &&
      validateDate
    ) {
      setFormData({ name, surname, date, email, gender });
      setName("");
      setSurname("");
      setDate("");
      setEmail("");
      setGender("");
    }
  };

  useEffect(() => {
    console.log(formData);
    formData && alert(JSON.stringify(formData));
  }, [formData]);

  return (
    <div className="Form">
      <div className="container">
        <header className="title">Registration</header>
        <article className="content">
          <form onSubmit={handleSubmit}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Name</span>
                <input
                  type="text"
                  placeholder="Enter your name"
                  onChange={(e) => handleName(e)}
                  value={name}
                />
                {!validateName && (
                  <Error msg="Name should be greater than 2 characters" />
                )}
              </div>

              <div className="input-box">
                <span className="details">Surname</span>
                <input
                  type="text"
                  placeholder="Enter your surname"
                  onChange={(e) => handleSurname(e)}
                  value={surname}
                />
                {!validateSurname && (
                  <Error msg="Surname should be greater than 2 characters" />
                )}
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input
                  type="text"
                  placeholder="Enter your email"
                  onChange={(e) => handleEmail(e)}
                  value={email}
                />
                {!validateEmail && <Error msg="Invalid email" />}
                {loading && <Oval color="#007f00" height={40} width={40} />}
              </div>
              <div className="input-box">
                <span className="details">Birth date</span>
                <input
                  type="date"
                  onChange={(e) => handleDate(e)}
                  value={date}
                />
                {!validateDate && <Error msg="Must be older than 18 years" />}
              </div>
            </div>

            <div className="gender-details" onClick={(e) => handleGender(e)}>
              <input type="radio" name="gender" id="dot-1" value="Male" />
              <input type="radio" name="gender" id="dot-2" value="Female" />
              <input
                type="radio"
                name="gender"
                id="dot-3"
                value="Prefer not to say"
              />
              <span className="gender-title">Gender</span>
              <div className="category">
                <label htmlFor="dot-1">
                  <span className="dot one"></span>
                  <span className="gender">Male</span>
                </label>
                <label htmlFor="dot-2">
                  <span className="dot two"></span>
                  <span className="gender">Female</span>
                </label>
                <label htmlFor="dot-3">
                  <span className="dot three"></span>
                  <span className="gender">Prefer not to say</span>
                </label>
              </div>
            </div>

            <div className="button">
              <input type="submit" value="Submit" />
            </div>
          </form>
        </article>
      </div>
      {/* <div className="container">
        <h3 className="title">Form Validation</h3>
        <form className="Form" onSubmit={handleSubmit}>
          <div className="user-details">
            <Input
              labelProp="Name"
              typeProp="text"
              id="name"
              value={name}
              handler={handleName}
              className="input-box"
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
              className="input-box"
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
              className="input-box"
            />
            {!validateDate && <Error msg="Must be older than 18 years" />}
            <Input
              labelProp="Email"
              typeProp="text"
              id="email"
              value={email}
              handler={handleEmail}
              className="input-box"
            />
            {!validateEmail && <Error msg="Invalid email" />}
            {loading && <ThreeDots color="#007f00" height={40} width={40} />}
          </div>

          <div onChange={(e) => handleGender(e)} className="gender-details">
            <span className="genter-title">Gender</span>
            <Radio labelProp="Male" typeProp="radio" id="gender" value="Male" />
            <Radio
              labelProp="Female"
              typeProp="radio"
              id="gender"
              value="Female"
            />
            <Radio
              labelProp="Prefer not to say"
              typeProp="radio"
              id="gender"
              value="Prefer not to say"
            />
          </div>

          <button type="submit" className="button">
            Submit
          </button>
        </form>
      </div> */}
    </div>
  );
};

export default Form;
