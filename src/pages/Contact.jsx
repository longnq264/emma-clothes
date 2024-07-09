import { Breadcrumb, Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Link } from "react-router-dom";
import { PhoneOutlined, MailOutlined, HomeOutlined } from "@ant-design/icons";

const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const ContactPage = () => (
  <>
    <div className="breadcrumb-site container mx-auto py-4">
      <Breadcrumb
        items={[
          {
            title: <Link to="/">Home</Link>,
          },
          {
            title: <Link to="/contact">Contact</Link>,
          },
        ]}
      />
    </div>
    <div className="container mx-auto my-20">
      <h1 className="text-6xl font-bold text-center my-12 text-gray-900">
        Contact Us
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 bg-gray-50 p-12 shadow-xl rounded-2xl">
          <h2 className="text-3xl font-semibold mb-8 text-gray-700">
            Emma có thể giúp gì cho bạn ?
          </h2>
          <Form
            name="basic"
            layout="vertical"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <Input
                placeholder="Your Name"
                className="p-4 border-2 border-gray-200 rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
              ]}
            >
              <Input
                placeholder="Your Email"
                className="p-4 border-2 border-gray-200 rounded-lg"
              />
            </Form.Item>
            <Form.Item
              name="comment"
              rules={[
                {
                  required: true,
                  message: "Please input your message!",
                },
              ]}
            >
              <TextArea
                placeholder="Your Message"
                rows={4}
                className="p-4 border-2 border-gray-200 rounded-lg"
              />
            </Form.Item>
            <Form.Item>
              <Button
                className="w-full p-0 text-lg bg-blue text-white hover:bg-gray-800 transition-colors duration-300"
                type="primary"
                htmlType="submit"
              >
                Gửi lời nhắn
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="bg-gray-50 p-12 shadow-xl rounded-2xl">
          <h2 className="text-3xl font-semibold mb-6 text-gray-700">
            Liên Hệ Chúng Tôi
          </h2>
          <p className="text-lg mb-4">
            Hãy liên hệ với chúng tôi để có được sự hỗ trợ
          </p>
          <br />
          <div className="flex items-center mb-4">
            <PhoneOutlined className="text-2xl mr-4 text-gray-600" />
            <span className="text-lg text-gray-700">0912345678</span>
          </div>
          <br />
          <div className="flex items-center mb-4">
            <MailOutlined className="text-2xl mr-4 text-gray-600" />
            <span className="text-lg text-gray-700">
              support@Emmafashion.com
            </span>
          </div>
          <br />
          <div className="flex items-center">
            <HomeOutlined className="text-2xl mr-4 text-gray-600" />
            <span className="text-lg text-gray-700">
              FPT Polytechnic Building, Trinh Van Bo Street, Phuong Canh Ward,
              Nam Tu Liem District, Hanoi City
            </span>
          </div>
        </div>
      </div>

      <section className="bg-gray-50 mt-16 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl lg:max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-extrabold text-gray-900">
              Ghé Thăm Store Emma
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Hãy khám phá các địa điểm cửa hàng của chúng tôi và tìm địa điểm
              gần bạn nhất.
            </p>
          </div>
          <div className="mt-16 lg:mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.861924320462!2d105.7402342151451!3d21.036894192863796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3134533c78c6c8a3%3A0xc808f34a3066c3b7!2sFPT%20Polytechnic%20H%C3%A0%20N%E1%BB%99i!5e0!3m2!1sen!2s!4v1624275977595!5m2!1sen!2s"
                width="100%"
                height="480"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg p-6">
              <h3 className="text-xl font-medium text-gray-900">
                Địa chỉ cửa hàng Emma
              </h3>
              <p className="mt-2 text-gray-600">
                FPT Polytechnic, Trinh Van Bo Street, Hanoi, Vietnam
              </p>
              <div className="border-t border-gray-200 mt-4 pt-4">
                <h3 className="text-xl font-medium text-gray-900">
                  Lịch mở cửa
                </h3>
                <p className="mt-2 text-gray-600">
                  Thứ Hai- Thứ Năm: 9am - 5pm
                </p>
                <p className="mt-1 text-gray-600">Thứ Bảy: 9am - 5pm</p>
                <p className="mt-1 text-gray-600">Chủ nhật: Đóng cửa</p>
              </div>
              <div className="border-t border-gray-200 mt-4 pt-4">
                <h3 className="text-xl font-medium text-gray-900">Liên Hệ</h3>
                <p className="mt-2 text-gray-600">
                  Email: support@Emmafashion.com
                </p>
                <p className="mt-1 text-gray-600">Số điện thoại: 0912345678</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </>
);

export default ContactPage;
