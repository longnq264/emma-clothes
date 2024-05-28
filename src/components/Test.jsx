import { useEffect } from "react";
// import "./App.css";
import axios from "axios";
import { useState } from "react";

const Test = () => {
  const [state, setState] = useState([]);

  const getListCategoriy = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/test");
      setState(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("state", state);
  useEffect(() => {
    getListCategoriy();
  }, []);
  return (
    <>
      <div className="test">
        <h1>{state.title}</h1>
      </div>
    </>
  );
};

export default Test;
