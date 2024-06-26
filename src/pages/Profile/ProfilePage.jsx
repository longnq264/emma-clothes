import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  return (
    <>
      <div className="container mx-auto py-2">
        <Breadcrumb
          items={[
            {
              title: <Link to="/">Home</Link>,
            },
            {
              title: <Link to="/products">Products</Link>,
            },
          ]}
        />
      </div>
      <div className="container mx-auto py-2">
        <h1>Profile User</h1>
      </div>
    </>
  );
};

export default ProfilePage;
