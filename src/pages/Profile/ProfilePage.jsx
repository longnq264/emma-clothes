import { Breadcrumb } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import DashBoad from "./DashBoad";
import EditProfile from "./EditProfile";
import Setting from "./Setting";
import Orders from "./OrderPage";

const ProfilePage = () => {
  const [activeSection, setActiveSection] = useState("Overview");

  const renderContent = () => {
    switch (activeSection) {
      case "Profile":
        return <DashBoad />;
      case "Edit Profile":
        return <EditProfile />;
      case "Settings":
        return <Setting />;
      case "Orders":
        return <Orders />;
      default:
        return <DashBoad />;
    }
  };

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
        <div className="flex">
          <div className="basis-1/4 bg-white shadow-md">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Profile</h2>
              <nav>
                <ul>
                  {["Profile", "Edit Profile", "Orders", "Settings"].map(
                    (section) => (
                      <li
                        key={section}
                        className={`nav-item p-4 cursor-pointer ${
                          activeSection === section ? "bg-gray-200" : ""
                        }`}
                        onClick={() => setActiveSection(section)}
                      >
                        {section}
                      </li>
                    )
                  )}
                </ul>
              </nav>
            </div>
          </div>
          <div className="basis-3/4 p-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProfilePage;
