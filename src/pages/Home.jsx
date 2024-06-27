import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import Banner from "../components/UI/Home/Banner";
function HomePage() {
  return (
    <>
      <div className="breadcrumb-site container mx-auto py-2">
        <Breadcrumb
          items={[
            {
              title: <Link to="/">Home</Link>,
            },
          ]}
        />
      </div>
      <Banner />
      <div className="container-site">
        <h1 className="title">Home Page</h1>
        <div className="content">
          <p className="text-center">
            Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
            consectetur, adipisci velit...
          </p>
          <p className="text-center">
            There is no one who loves pain itself, who seeks after it and wants
            to have it, simply because it is pain...
          </p>
        </div>
      </div>
    </>
  );
}

export default HomePage;
