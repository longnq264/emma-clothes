import { Breadcrumb, Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Link } from "react-router-dom";
const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const ContactPage = () => (
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
    <div className="container mx-auto my-20">
      <h1 className="title my-8">Contact</h1>
      <div className="grid grid-cols-2">
        <div className="form-contact">
          <Form
            name="basic"
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 16,
            }}
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
                  message: "Please input your username!",
                },
              ]}
            >
              <Input placeholder="Your Name" />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input placeholder="Your Email" />
            </Form.Item>
            <Form.Item
              name="avia_3_1"
              rules={[
                {
                  required: true,
                  message: "Please input your comment!",
                },
              ]}
            >
              <TextArea placeholder="Comment" rows={4} />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                span: 16,
              }}
            >
              <Button className="w-full" type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.7257653295324!2d105.779069212123!3d21.043656080528475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454ccae536be7%3A0x509333dd21815f6c!2zUGjhuqFtIFbEg24gxJDhu5NuZywgTWFpIEThu4tjaCwgQ-G6p3UgR2nhuqV5LCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1717933166866!5m2!1svi!2s"
            width={600}
            height={450}
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  </>
);
export default ContactPage;
