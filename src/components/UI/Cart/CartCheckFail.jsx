import { MdDelete } from "react-icons/md";

const CartChecFail = () => {
  const cartItems = [
    {
      id: 1,
      product: {
        name: "Sản phẩm 1",
        image: "https://via.placeholder.com/100",
      },
      price: 100000,
      quantity: 2,
      variant: {
        sku: "SP001",
      },
    },
    {
      id: 2,
      product: {
        name: "Sản phẩm 2",
        image: "https://via.placeholder.com/100",
      },
      price: 200000,
      quantity: 1,
      variant: {
        sku: "SP002",
      },
    },
  ];

  return (
    <div className="bg-white">
      <div className="item px-4 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <p className="py-2 font-bold">Số lượng sản phẩm:</p>
          <p className="pl-2 py-2 font-bold">{cartItems.length} sản phẩm</p>
        </div>
        <button className="border px-2 py-2 font-bold rounded-lg hover:bg-stone-300">
          <MdDelete size={20} />
        </button>
      </div>
      <div className="min-h-72 pt-4">
        {cartItems.map((item) => (
          <div key={item.id} className="border-gray-100 px-4 py-6 flex justify-between border-t-4">
            <div className="flex">
              <div className="basis-1/5">
                <img src={item.product.image} alt="" className="w-full h-full" />
              </div>
              <div className="pl-4 basis-4/5">
                <p className="text-base font-bold text-gray-700 mb-2">
                  {item.product.name}
                </p>
                <p className="text-base font-semibold text-gray-700">
                  {Number(item.price).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
                <div className="flex justify-between items-center mt-20">
                  <div className="border rounded-lg hover:bg-stone-300 h-10 px-2 flex items-center">
                    <p className="text-stone-700 text-xs text-center">{item.variant.sku}</p>
                  </div>
                  <div className="size-1/4">
                    <div className="border flex justify-around rounded-lg items-center leading-10">
                      <button>-</button>
                      <p className="text-center">{item.quantity}</p>
                      <button>+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button className="border px-2 py-2 font-bold rounded-lg hover:bg-stone-200 h-10">
              <MdDelete size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartChecFail;
