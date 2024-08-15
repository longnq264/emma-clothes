import { useEffect } from "react";
import { useState } from "react";
import { getListAddress } from "../../../api/api-server";

const ListAddress = () => {
  const [address, setAddress] = useState([]);
  console.log(address);

  const fetchAddress = async () => {
    try {
      const response = await getListAddress();
      console.log(response);
      setAddress(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAddress();
  }, []);
  return <div></div>;
};

export default ListAddress;
