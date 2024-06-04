import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb } from "antd";
const Blogs = () => {
  const [state, setState] = useState([]);
  const getData = async () => {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      // const response = res.slice(0, 9);
      const slicedata = res.data.slice(0, 9);
      setState(slicedata);
      console.log(slicedata);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="breadcrumb-site">
        <Breadcrumb
          items={[
            {
              title: <Link to="/">Home</Link>,
            },
            {
              title: <Link to="/blog">Blog</Link>,
            },
          ]}
        />
      </div>
      <div className="Blogs-site">
        <h1 className="title">Blogs Page</h1>
        <div className="">
          {state.map((data) => (
            <Link key={data.id} to={`http://localhost:5173/blog/${data.id}`}>
              <div className="py-6 px-2 border-2 my-2">
                <h1>{data.title}</h1>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Blogs;
