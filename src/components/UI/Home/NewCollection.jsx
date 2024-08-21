import newImg from "../../../assets/img/new-collection.jpg";
const NewCollection = () => {
  return (
    <div className="new-collection my-14">
      <div className="container mx-auto">
        <div className="flex">
          <div className="basis-1/2 px-20 ">
            <h1 className="text-6xl py-10 font-bold px-20 text-stone-400 leading-tight">
              Get Ready for our new Bold Collections!
            </h1>
            <div className="px-20 text-lg">
              <p className="">
                Introducing Our New Bold Collections! Elevate your style with
                daring designs and vibrant statements.
              </p>
              <p>
                Explore striking patterns and bold colors that redefine your
                wardrobe. Get ready to embrace the extraordinary!
              </p>
              <button className=" mt-6 btn pointer text-white bg-stone-600 py-3 px-5 rounded-lg">
                View Collections
              </button>
            </div>
          </div>
          <div className="basis-1/2">
            <img className="h-full w-full" src={newImg} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCollection;
