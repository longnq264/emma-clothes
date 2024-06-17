import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <>
      <div className="breadcrumb-site container mx-auto py-2">
        <Breadcrumb
          items={[
            {
              title: <Link to="/">Home</Link>,
            },
            {
              title: <Link to="/about">About</Link>,
            },
          ]}
        />
      </div>
      <div className="container mx-auto py-4">
        <h1 className="title">About Page</h1>
      </div>
    </>
  );
};

export default AboutPage;
