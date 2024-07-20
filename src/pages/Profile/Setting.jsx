const Setting = () => {
  return (
    <div className="w-3/4 p-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      {/* Content goes here based on the selected option */}
      <div id="profile" className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
        {/* Form or content for Profile Settings */}
        <form className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Save Changes
          </button>
        </form>
      </div>

      <div id="account" className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
        {/* Form or content for Account Settings */}
      </div>

      <div id="notifications" className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
        {/* Form or content for Notification Settings */}
      </div>

      <div id="privacy" className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Privacy Settings</h2>
        {/* Form or content for Privacy Settings */}
      </div>
    </div>
  );
};

export default Setting;
