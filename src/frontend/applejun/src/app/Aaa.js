import axios from "axios";
import { useEffect, useState } from "react";

function Aaa() {
  const [apiResponse, setApiResponse] = useState(null);

  const getAaa = async () => {
    try {
      const response = await axios.get("http://localhost:8080/aaa");
      console.log("API Response : ", response.data);
      setApiResponse(response.data);
    } catch (error) {
      console.error("Error from Spring! : ", error);
    }
  };

  useEffect(() => {
    getAaa();
  }, []);

  return (
    <div>
      <h1>Spring API Response from aaa</h1>
      {apiResponse && (
        <div>
          <p>Code : {apiResponse.code}</p>
          <p>Message : {apiResponse.msg}</p>
          <p>Contents : {apiResponse.contents}</p>
        </div>
      )}
    </div>
  );
}

export default Aaa;
