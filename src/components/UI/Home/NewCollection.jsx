import newImg from "../../../assets/img/new-collection.jpg";
const NewCollection = () => {
  return (
    <div className="new-collection my-14 px-2 md:px-0">
      <div className="container mx-auto">
        <div className="md:grid grid-cols-2">
          <div className="">
            <h1 className=" md:text-6xl py-10 font-bold text-stone-400 leading-tight">
              Get Ready for our new Bold Collections!
            </h1>
            <div className=" text-lg">
              <p className="">
                Introducing Our New Bold Collections! Elevate your style with
                daring designs and vibrant statements.
              </p>
              <p>
                Explore striking patterns and bold colors that redefine your
                wardrobe. Get ready to embrace the extraordinary!
              </p>
              <button className="hidden mt-6 btn pointer text-white bg-stone-600 py-3 px-5 rounded-lg">
                View Collections
              </button>
            </div>
          </div>
          <div className="">
            <img className="h-full w-full" src={newImg} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCollection;
