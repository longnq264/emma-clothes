const NewCollection = () => {
  return (
    <div className="new-collection lg:my-14 px-2 md:px-0">
      <div className="container mx-auto">
        <div className="md:grid grid-cols-2">
          <div className="lg:pr-20">
            <h1
              className="text-6xl py-10 font-bold text-stone-400"
              style={{
                lineHeight: "initial",
              }}
            >
              Hãy sẵn sàng cho Bộ sưu tập táo bạo mới của chúng tôi!{" "}
            </h1>
            <div className="text-lg ">
              <p className="py-2 font-semibold text-stone-600">
                Giới thiệu Bộ sưu tập táo bạo mới của chúng tôi! Nâng tầm phong
                cách của bạn với những thiết kế táo bạo và những tuyên bố sống
                động.
              </p>
              <p className="py-2 font-semibold text-stone-600">
                Khám phá những họa tiết nổi bật và màu sắc đậm nét định hình lại
                tủ quần áo của bạn. Hãy sẵn sàng đón nhận điều phi thường!
              </p>
              <button className="hidden mt-6 btn pointer text-white bg-stone-600 py-3 px-5 rounded-lg">
                Xem Bộ sưu tập{" "}
              </button>
            </div>
          </div>
          <div>
            <h1>New Collection</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCollection;
