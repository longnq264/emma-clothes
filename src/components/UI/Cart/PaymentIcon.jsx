import payment1 from "../../../assets/img/zalopay.png";
import payment2 from "../../../assets/img/vnpay-qr.png";
import payment3 from "../../../assets/img/visa-card.png";
const PaymentIcon = () => {
  return (
    <>
      <div className="bg-gray-50 pb-6">
        <div className="flex justify-center pt-6">
          <div>
            <img src={payment1} alt="" style={{ height: 28 }} />
          </div>
          <div className="px-2">
            <img src={payment2} alt="" style={{ height: 28 }} />
          </div>
          <div>
            <img src={payment3} alt="" style={{ height: 28 }} />
          </div>
        </div>
        <p className="text-xs font-semibold text-center pt-2">
          Đảm bảo thanh toán an toàn và bảo mật
        </p>
      </div>
    </>
  );
};

export default PaymentIcon;
