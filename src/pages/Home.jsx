import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
function HomePage() {
  return (
    <>
      <div className="breadcrumb-site">
        <Breadcrumb
          items={[
            {
              title: <Link to="/">Home</Link>,
            },
          ]}
        />
      </div>
      <div className="container-site">
        <h1 className="title">Home Page</h1>
        <div className="content">
          <p>Content</p>
        </div>
      </div>
    </>
  );
}

export default HomePage;
