import { useEffect } from "react";

const Fetch = ({ timerEmail, email, setEmailStatus, setLoading }) => {
  // "CORS Anywhere" is a NodeJS proxy which adds CORS headers to the proxied request to avoid “No Access-Control-Allow-Origin header” problems.
  const corsAnywhereURL = "https://peaceful-gorge-48410.herokuapp.com/";
  const emailValidatorURL = "https://extensi.io/api/email-validator.php?email=";

  useEffect(() => {
    setLoading(true);
    timerEmail &&
      fetch(corsAnywhereURL + emailValidatorURL + email)
        .then((res) => res.json())
        .then((result) => {
          setEmailStatus(result.validation_status);
          setLoading(false);
        })
        .catch((err) => console.log(err));
  }, [timerEmail]);
};

export default Fetch;
