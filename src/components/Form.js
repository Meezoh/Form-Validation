import { useState, useEffect } from "react";
import { Oval } from "react-loader-spinner";
import Input from "./Input";
import Error from "./Error";
import Fetch from "./Fetch";

const Form = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [formData, setFormData] = useState("");
  const [radioChecked, setRadioChecked] = useState("");

  const [validateName, setValidateName] = useState(true);
  const [validateSurname, setValidateSurname] = useState(true);
  const [validateDate, setValidateDate] = useState(true);
  const [validateEmail, setValidateEmail] = useState(true);
  const [emailStatus, setEmailStatus] = useState(true);
  const [loading, setLoading] = useState(false);

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
    setRadioChecked(gender);
  }, [name, surname, date, email, emailStatus, gender]);

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
      validateDate &&
      !loading
    ) {
      setFormData({ name, surname, date, email, gender });
      setName("");
      setSurname("");
      setDate("");
      setEmail("");
      setGender("");
    }
  };

  // Alert form submission
  useEffect(() => {
    formData && alert(JSON.stringify(formData));
    formData && console.log(formData);
  }, [formData]);

  return (
    <div className="Form">
      <div className="container">
        <header className="title">Registration</header>
        <article className="content">
          <form onSubmit={handleSubmit}>
            <div className="user-details">
              <div className="input-box">
                <Input
                  fieldName="Name"
                  type="text"
                  placeholder="Enter your name"
                  handler={handleName}
                  value={name}
                />
                {!validateName && (
                  <Error msg="Name should be greater than 2 characters" />
                )}
              </div>

              <div className="input-box">
                <Input
                  fieldName="Surname"
                  type="text"
                  placeholder="Enter your surname"
                  handler={handleSurname}
                  value={surname}
                />
                {!validateSurname && (
                  <Error msg="Surname should be greater than 2 characters" />
                )}
              </div>
              <div className="input-box">
                <Input
                  fieldName="Email"
                  type="text"
                  placeholder="Enter your email"
                  handler={handleEmail}
                  value={email}
                />
                {!validateEmail && <Error msg="Invalid email" />}
                {loading && <Oval color="#007f" height={40} width={40} />}
              </div>
              <div className="input-box">
                <Input
                  fieldName="Birth date"
                  type="date"
                  handler={handleDate}
                  value={date}
                />
                {!validateDate && <Error msg="Must be older than 18 years" />}
              </div>
            </div>

            <div className="gender-details">
              <input
                type="radio"
                name="gender"
                id="dot-1"
                value="Male"
                onChange={handleGender}
                checked={radioChecked == "Male"}
              />
              <input
                type="radio"
                name="gender"
                id="dot-2"
                value="Female"
                onChange={handleGender}
                checked={radioChecked == "Female"}
              />
              <input
                type="radio"
                name="gender"
                id="dot-3"
                value="Prefer not to say"
                onChange={handleGender}
                checked={radioChecked == "Prefer not to say"}
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
          <Fetch
            email={email}
            setEmailStatus={setEmailStatus}
            setLoading={setLoading}
          />
        </article>
      </div>
    </div>
  );
};

export default Form;
