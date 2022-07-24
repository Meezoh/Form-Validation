import { useEffect } from "react";

const Fetch = ({ email, setEmailStatus, setLoading }) => {
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
};

export default Fetch;
