import { Banner } from 'types/Home';

const HomeBanner = ({ imageUrl, lineOne, lineTwo }: Banner) => {
  return (
    <div
      className="bg-no-repeat bg-center bg-cover z-30"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div
        className="flex flex-col items-center justify-center text-center"
        style={{ minHeight: '575px' }}
      >
        <h1 className="m-0 p-0 banner-shadow  text-cream-200 font-bold text-7xl">
          {lineOne}
        </h1>
        <h2 className="m-0 p-0 banner-shadow  text-white italic font-serif font-bold text-7xl">
          {lineTwo}
        </h2>
      </div>
    </div>
    // <>{JSON.stringify(imageUrl)}</>
  );
};

export default HomeBanner;
