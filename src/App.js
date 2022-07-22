import { BrowserRouter } from "react-router-dom";
import Form from "./components/Form";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Form />
      </BrowserRouter>
    </div>
  );
}

export default App;

// when typing no error message should be shown
// only after a fetch, if validateEmail is false show error message
