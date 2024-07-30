import { Link } from "react-router-dom";
import FlashSale from "../../../assets/img/flash-sale.png";
const FlashSaleCom = () => {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-2 gap-4 my-4">
        <Link>
          <img src={FlashSale} alt="" />
        </Link>
        <Link>
          <img src={FlashSale} alt="" />
        </Link>
        <Link>
          <img src={FlashSale} alt="" />
        </Link>
        <Link>
          <img src={FlashSale} alt="" />
        </Link>
      </div>
    </div>
  );
};

export default FlashSaleCom;
