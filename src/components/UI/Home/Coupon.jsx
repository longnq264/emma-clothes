import { useEffect, useState } from "react";
import coupon from "../../../assets/img/couponticket.png";
import { getAllCoupons } from "../../../api/coupon";
import CopyCoupon from "../Coupon/CopyCoupon";
const Coupon = () => {
  const revertPercent = (number) => {
    const percentage = `${(number / 100) * 100}%`;
    return percentage;
  };
  const [coupons, setCoupons] = useState([]);
  const fetchCoupons = async () => {
    const response = await getAllCoupons();
    setCoupons(response.data);
  };
  useEffect(() => {
    fetchCoupons();
  }, []);
  return (
    <div className="container mx-auto hidden xl:block">
      <div className="flex justify-around mt-8">
        {coupons.slice(0, 3).map((data) => (
          <div key={data.id} className="basis-1/5">
            <div className="flex items-center space-between relative">
              <img src={coupon} alt="" className="w-full" />
              <div className="py-2 px-2 size-2/3 absolute top-8 left-9 bg-gray-100 h-16">
                <div className="text-sm flex w-full">
                  <span className="basis-2/3 text-xs pt-3">
                    Giảm tối đa trên tổng hóa đơn
                  </span>
                  <span className="text-red-800 basis-2/3 text-4xl font-bold pl-4 pt-2">
                    {revertPercent(data.discount)}
                  </span>{" "}
                </div>
              </div>
              <div className="absolute top-4 left-14 w-2/3 bg-white">
                <p className="text-xs font-semibold opacity-70 cursor-pointer text-red-500">
                  Mã: {data.code}
                </p>
              </div>
              <div className="absolute bottom-11 left-7 bg-white w-2/3">
                <p className="text-xs text-gray-500 mt-1">
                  HSD: {data.expiration_date}
                </p>
              </div>
              <div className="absolute bottom-5 right-16">
                <CopyCoupon couponCopy={data.code} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Coupon;
