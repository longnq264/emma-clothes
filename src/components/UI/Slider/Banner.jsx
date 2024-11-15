import  { useEffect, useState } from "react";
import Slider from "react-slick";
import { getBanners } from '../../../api/banner';

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const response = await getBanners();
      // console.log("Banners response:", response);

      if (response && response.data && Array.isArray(response.data)) {
        // Chỉ lấy những banner đang active
        const activeBanners = response.data.filter(banner => banner.active === 1);
        setBanners(activeBanners);
      } else {
        setError('Unexpected data format');
      }
    } catch (err) {
      setError('Failed to load banners');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container mx-auto px-10 py-4">Loading banners...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-10 py-4 text-red-500">{error}</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="banner-carousel mb-6">
      <Slider {...settings}>
        {banners && banners.length > 0 ? (
          banners.map((banner, index) => (
            <div key={index} className="relative w-full h-full mb-4">
              {banner.link ? (
                <a href={banner.link} target="_blank" rel="noopener noreferrer">
                  <img
                    src={banner.image_url}
                    alt={banner.title}
                    className="w-full h-full object-cover"
                  />
                </a>
              ) : (
                <img
                  src={banner.image_url}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          ))
        ) : (
          <div>No banners available</div>
        )}
      </Slider>
    </div>
  );
};

export default Banner;
