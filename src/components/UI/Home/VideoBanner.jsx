import banner from "../../../assets/img/banner.mp4";
const VideoBanner = () => {
  return (
    <video className="w-full md:hidden" autoPlay muted loop playsInline>
      <source src={banner} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoBanner;
