import { useState } from "react";
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
      <div className="py-2">
        <div className="flex">
          <div className=" basis-1/6 bg-white shadow-md">
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
          <div className="basis-5/6 p-6">
            <div className="bg-white rounded-lg shadow-lg min-h-screen">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProfilePage;
