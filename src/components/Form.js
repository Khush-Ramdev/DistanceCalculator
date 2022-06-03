import { useState } from "react";
import Map from "./Map";

const Form = () => {
  const [origin, setorigin] = useState("");
  const [destination, setdestination] = useState("");
  const [distance, setDistance] = useState(0);
  const [calculate, setCalculate] = useState(false);

  const handleCalculate = (e) => {
    e.preventDefault();
    if (destination !== "" && origin !== "") {
      setCalculate(true);
    } else {
      setCalculate(false);
    }
  };

  return (
    <div className="form">
      <div className="heading">
        Let's calculate <strong>distance</strong> from Google maps
      </div>
      <div className="formLabel">
        <div className="formLeft">
          <form className="maxWidth">
            <label htmlFor="origin">Origin</label>
            <br></br>

            <input
              name="origin"
              type="text"
              onChange={(e) => setorigin(e.target.value)}
              className="formInput"
              placeholder="Delhi"
            ></input>

            <br></br>
            <button className="calculate" onClick={handleCalculate}>
              Calculate
            </button>
            <br></br>
            <label htmlFor="destination">Destination</label>
            <br></br>
            <input
              name="destination"
              type="text"
              onChange={(e) => setdestination(e.target.value)}
              className="formInput"
              placeholder="Mumbai"
            ></input>
          </form>
          <div>
            <div className="distance">
              {" "}
              <h3>Distance</h3> <h2 className="dist">{distance} </h2>
            </div>
            <div className="information">
              The distance between <strong>{origin}</strong> and{" "}
              <strong>{destination}</strong> is <strong>{distance}</strong>
            </div>
          </div>
        </div>
        <Map
          origin={origin}
          destination={destination}
          calculate={calculate}
          setCalculate={setCalculate}
          setDistance={setDistance}
        ></Map>
      </div>
    </div>
  );
};

export default Form;
