const Footer = () => {
  return (
    <footer className="bg-stone-800 text-white py-4 w-full">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; 2024 Emma Clothing. All rights reserved.
        </p>
        <p className="text-sm">
          Follow us on:
          <a href="#" className="text-blue-500 ml-2">
            Facebook
          </a>{" "}
          |
          <a href="#" className="text-blue-500 ml-2">
            Twitter
          </a>{" "}
          |
          <a href="#" className="text-blue-500 ml-2">
            Instagram
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
