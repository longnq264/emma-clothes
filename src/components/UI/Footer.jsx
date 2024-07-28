import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

// Constants for navigation links in footer
export const NAV_LINKS_FOOTER = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
  { href: "/blog", label: "Contact Us" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
];

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-slate-100 py-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Emma</h2>
            <p>123 Main St, Anytown, USA</p>
            <p>(123) 456-7890</p>
            <p>email@example.com</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Quick Links</h2>
            <ul>
              {NAV_LINKS_FOOTER.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:underline">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="hover:text-gray-400">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" className="hover:text-gray-400">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" className="hover:text-gray-400">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" className="hover:text-gray-400">
                <FaLinkedinIn />
              </a>
              <a href="https://youtube.com" className="hover:text-gray-400">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Subscribe to our Newsletter</h2>
            <form className="flex space-x-2">
              <input
                type="email"
                className="w-full p-2 rounded-md text-black"
                placeholder="Enter your email"
              />
              <button className="px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-700">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Additional Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Customer Support Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Customer Support</h2>
            <p>
              For any inquiries or assistance, please contact our customer
              support team.
            </p>
            <p>Email: support@example.com</p>
            <p>Phone: (123) 456-7891</p>
          </div>

          {/* Certifications and Awards */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Certifications and Awards</h2>
            <p>
              Our company is certified by various organizations and has received
              numerous awards for excellence.
            </p>
            <ul className="list-disc list-inside">
              <li>Best Company Award 2023</li>
              <li>ISO 9001 Certification</li>
              <li>Green Business Certification</li>
            </ul>
          </div>
        </div>

        {/* Copyright Information */}
      </div>
      <div className="text-center mt-8 border-t border-gray-700 pt-4">
        <p>&copy; 2024 Emma. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
