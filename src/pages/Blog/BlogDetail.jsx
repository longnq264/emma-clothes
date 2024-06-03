// import { useState } from "react";
import { useParams } from "react-router-dom";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
const BlogDetail = () => {
  const { id } = useParams();
  console.log(id);
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
            {
              title: <Link to={`/blog/${id}`}>Blog {id}</Link>,
            },
          ]}
        />
      </div>
      <div className="blog-detail-site">
        <h1 className="text-3xl">Blog Detail</h1>
        <p className="">Blog Detail: {id}</p>
      </div>
    </>
  );
};

export default BlogDetail;
