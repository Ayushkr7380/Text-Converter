import { useState } from "react";
import PropTypes from "prop-types";
import "./TextConverter.css";
import Alert from "./Alert";
import LoadingBar from "react-top-loading-bar";

const TextConverter = (props) => {
  const [Text, Settext] = useState("");
  const [darkmode, setdarkmode] = useState("primary");
  const [alert, SetAlert] = useState(null);
  const [progress, setProgress] = useState(0);


  const progressbarfun =()=>{
    let i = 0;
    const interval = setInterval(() => {
      i = i + 25;
      setProgress((prev)=>{return prev + 25});
      if(i>100){
        clearInterval(interval)
      }
      
    }, 100);
  }

  const showalert = (message, type) => {
    SetAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      SetAlert(null);
    }, 1000);
  };

  const enabledarkmode = () => {
    if (darkmode === "primary") {
      progressbarfun();
      setdarkmode("dark");
      document.body.style.backgroundColor = "rgb(98, 98, 99)";
      showalert("Dark Mode has been enabled", "success");
    } else {
      document.body.style.backgroundColor = "white";
      setdarkmode("primary");
      showalert("Light Mode has been enabled", "success");
    }
  };

  const checktext = (msg) => {
    const t = document.getElementById("text");
    if (t.value !== "") {
      showalert(msg, "success");
    } else {
      showalert("Please enter something....", "success");
    }
  };

  const upperCase = () => {
    let data = Text.toUpperCase();
    Settext(data);
    progressbarfun();
    // showalert('Converted to Uppercase','success');
    checktext("Converted to Uppercase");
    

  };

  const changetextarea = (e) => {
    Settext(e.target.value);
  };

  const clearScreen = () => {
    Settext("");
    progressbarfun();
    // showalert('Screen is cleared','success');
    checktext("Screen Cleared");
  };
  const lowerCase = () => {
    let data = Text.toLowerCase();
    Settext(data);
    progressbarfun();
    // showalert('Converted to Lowercase','success');
    checktext("Converted to Lowercase");
  };
  const First_upperCase = () => {
    let data = Text.charAt(0).toUpperCase() + Text.slice(1);
    Settext(data);
    progressbarfun();
    // showalert('First Word Converted to Uppercase','success');
    checktext("First Word Converted to Uppercase");
  };
  const Copy1 = () => {
    let t = document.getElementById("text");
    t.select();
    progressbarfun();
    navigator.clipboard.writeText(t.value);
    checktext("Copied to clipboard");
  };
  const countcharacter = () => {
    let numberofcharacter = Text.replace(/\s/g, "").length;
    return numberofcharacter;
  };

  return (
    <>
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        
      />

      <nav
        className={`navbar navbar-expand-lg  ${
          darkmode === "dark" ? "bg-dark" : "bg-primary"
        }`}
        style={{
          color: darkmode === "dark" ? "white" : "",
        }}
      >
        <div className="container-fluid">
          <a
            className="navbar-brand"
            href="#"
            style={{
              color: darkmode === "dark" ? "white" : "",
            }}
          >
            Text-Converter
          </a>
          <button
            style={{
              backgroundColor: darkmode === "dark" ? "white" : "",
            }}
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                  style={{
                    color: darkmode === "dark" ? "white" : "",
                  }}
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  style={{
                    color: darkmode === "dark" ? "white" : "",
                  }}
                >
                  Link
                </a>
              </li>
            </ul>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                onClick={enabledarkmode}
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                DarkMode
              </label>
            </div>
          </div>
        </div>
      </nav>

      <Alert data={alert} />

      <div
        className="main"
        style={{ color: darkmode === "dark" ? "white" : "black" }}
      >
        <h1>{props.title1}</h1>
        <div className="textbox">
          <textarea
            name="text"
            value={Text}
            onChange={changetextarea}
            id="text"
            cols="30"
            rows="10"
          ></textarea>
        </div>
        <div className="btn1">
          <button
            type="button"
            onClick={upperCase}
            className={`btn btn-${darkmode}`}
          >
            Capitalize
          </button>
          <button
            type="button"
            onClick={lowerCase}
            className={`btn btn-${darkmode}`}
          >
            LowerCase
          </button>
          <button
            type="button"
            onClick={First_upperCase}
            className={`btn btn-${darkmode}`}
          >
            CapitalizeFirstLetter
          </button>
          <button
            type="button"
            onClick={Copy1}
            className={`btn btn-${darkmode}`}
          >
            Copy
          </button>
          <button
            type="button"
            onClick={clearScreen}
            className={`btn btn-${darkmode}`}
          >
            ClearScreen
          </button>
        </div>
        <div className="MoreInfo">
          <p>Number of Character : {countcharacter()}</p>
          <p>
            Number of Word :{" "}
            {
              Text.trim()
                .split(/\s+/)
                .filter((word) => word !== "").length
            }
          </p>
          <p>
            Times :{" "}
            {(0.43 *
              Text.trim()
                .split(/\s+/)
                .filter((word) => word !== "").length) /
              60}{" "}
            Minutes
          </p>
        </div>
        <div className="Preview">
          <h3>PREVIEW</h3>
          <p style={{ backgroundColor: darkmode === "dark" ? "black" : "" }}>
            {Text}
          </p>
        </div>
      </div>
    </>
  );
};

TextConverter.propTypes = {
  title1: PropTypes.string.isRequired,
};

export default TextConverter;
