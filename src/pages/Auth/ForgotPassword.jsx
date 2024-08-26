import { Button, Form, Input } from "antd";

const ForgotPassword = () => {
  const onFinish = async (values) => {
    console.log(values);
  };
  const onFinishFailed = async (values) => {
    console.log(values);
  };
  return (
    <div className="mt-20">
      <div className="container mx-auto">
        <div className="wrap-content flex justify-center">
          <div className="bg-white bg-opacity-20 w-96 p-10 rounded-r-lg shadow-2xl">
            <h1 className="font-bold text-center text-white text-3xl mb-10 ">
              ForgotPass
            </h1>
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              className=""
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
                className="mb-4 text-sm font-medium text-gray-700"
              >
                <Input
                  className="bg-white bg-opacity-20 border-none h-10"
                  placeholder="Email"
                />
              </Form.Item>

              <Form.Item className="">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={status === "loading"}
                  className="w-full bg-orange-400 bg-opacity-50 h-10"
                >
                  <p className="font-bold">Send Mail</p>
                </Button>
              </Form.Item>
              {/* {error && <div>Error</div>} */}
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
