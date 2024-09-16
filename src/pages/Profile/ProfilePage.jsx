import { useState } from "react";
import DashBoad from "./DashBoad";
import EditProfile from "./EditProfile";
import Orders from "./OrderPage";

const ProfilePage = () => {
  const [activeSection, setActiveSection] = useState("Overview");

  const renderContent = () => {
    switch (activeSection) {
      case "Profile":
        return <DashBoad />;
      case "Edit Profile":
        return <EditProfile />;
      case "Orders":
        return <Orders />;
      default:
        return <DashBoad />;
    }
  };

  return (
    <>
      <div className="bg-gray-100">
        <div className="py-2 container mx-auto lg:px-32 ">
          <div className="flex">
            <div className=" basis-1/4 bg-white shadow-md">
              <div className="p-6">
                <h2 className="text-lg font-semobold mb-6">
                  TỔNG QUAN TÀI KHOẢN
                </h2>
                <nav>
                  <ul>
                    {["Profile", "Edit Profile", "Orders"].map((section) => (
                      <li
                        key={section}
                        className={`nav-item py-3 px-4 cursor-pointer ${
                          activeSection === section
                            ? "bg-gray-200 rounded-lg"
                            : ""
                        }`}
                        onClick={() => setActiveSection(section)}
                      >
                        {section}
                      </li>
                    ))}
                    <li className="py-3 px-4 cursor-pointer">Logout</li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="basis-3/4 pl-2">
              <div className="bg-white shadow-lg min-h-screen">
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProfilePage;
