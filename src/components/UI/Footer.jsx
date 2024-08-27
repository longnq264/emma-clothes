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
  { href: "/blog", label: "Blog" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
];

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-slate-100 py-10">
      <div className="container mx-auto px-2 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Liên Hệ</h2>
            <ul className="text-slate-300">
              <li className="pb-2">165 Cau Giay , Ha Noi, VN</li>
              <li className="pb-2">+84 4567890</li>
              <li className="pb-2">emmaclothing@gmail.com</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Về Emma</h2>
            <ul className="text-slate-300">
              {NAV_LINKS_FOOTER.map((link, index) => (
                <li key={index} className="pb-2">
                  <a href={link.href} className="hover:underline">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Theo Dõi Chúng Tôi</h2>
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
            <h2 className="text-xl font-bold">Hỗ trợ khách hàng</h2>
            <ul className="text-slate-300">
              <li className="pb-2">
                Nếu có bất kỳ thắc mắc hoặc hỗ trợ nào, vui lòng liên hệ với
                nhóm hỗ trợ khách hàng của chúng tôi.
              </li>
              <li className="pb-2">Email: emmaclothing@gmail.com</li>
              <li>Phone: + 84 4567891</li>
            </ul>
          </div>
        </div>

        {/* Additional Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Chứng nhận và Giải thưởng</h2>
            <p className="text-slate-300">
              Công ty chúng tôi được chứng nhận bởi nhiều tổ chức khác nhau và
              đã nhận được nhiều giải thưởng về sự xuất sắc.
            </p>
            <ul className="list-disc list-inside text-slate-300">
              <li className="mb-2">Giải thưởng Công ty tốt nhất năm 2023</li>
              <li className="mb-2">Chứng nhận ISO 9001</li>
              <li>Chứng nhận doanh nghiệp xanh</li>
            </ul>
          </div>
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

        {/* Copyright Information */}
      </div>
      <div className="text-center mt-8 border-t border-gray-700 pt-4">
        <p>&copy; 2024 Emma. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
