import menImage from "../../../assets/img/men-clothing.jpg";
const AboutUs = () => {
  return (
    <div className="px-2 md:px-0 mt-14">
      <div className="container mx-auto">
        <div className="md:flex">
          <div className="basis-1/2">
            <img className="w-full" src={menImage} alt="" />
          </div>
          <div className="basis-1/2">
            <h1 className="text-6xl font-bold text-stone-500">About Us</h1>
            <p className="pt-10 text-lg pr-28">
              Lorem Ipsum has been the standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to
              make a type specimen book. It has survived not only five centuries
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
