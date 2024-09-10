import menImage from "../../../assets/img/men-clothing.jpg";
const AboutUs = () => {
  return (
    <div className="md:px-0 mt-14">
      <div className="container mx-auto">
        <div className="flex flex-col-reverse lg:flex-row">
          <div className="basis-1/2">
            <img className="w-full" src={menImage} alt="" />
          </div>
          <div className="basis-1/2 px-4 pb-10 pt-0 sm:px-10 lg:px-0 lg:pb-0 xl:pt-10 lg:pl-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-stone-500 text-center md:text-start">
              About Us
            </h1>
            <p className="pt-10 text-base md:text-xl md:pr-24 text-center md:text-start">
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
