interface Props {
  title: string;
  bannerImage?: string | null | undefined;
}

const PageBanner = ({ title, bannerImage }: Props) => {
  return (
    <div
      className="bg-no-repeat bg-center bg-cover z-30"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      <h1
        style={{ minHeight: '500px' }}
        className="text-5xl sm:text-6xl lg:text-7xl font-bold text-cream-200 m-auto font-serif italic flex flex-col items-center justify-center banner-shadow text-center"
      >
        {title}
      </h1>
    </div>
  );
};

export default PageBanner;
