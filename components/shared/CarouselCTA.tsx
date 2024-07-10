import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const CarouselCTA = () => {
  var settings = {
    dots: false,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: 'ease-in',
    slidesPerRow: 3,
  };
  return (
    <div className="border-double border-4 border-indigo-600 max-w-full overflow-hidden">
      <Slider {...settings}>
        <div className="bg-red-500 w-full h-96">
          <h3>1</h3>
        </div>
        <div className="bg-blue-500 w-full h-96">
          <h3>2</h3>
        </div>
        <div className="bg-green-500 w-full h-96">
          <h3>3</h3>
        </div>
        <div className="bg-yellow-500 w-full h-96">
          <h3>4</h3>
        </div>
        <div className="bg-purple-500 w-full h-96">
          <h3>5</h3>
        </div>
        <div className="bg-pink-500 w-full h-96">
          <h3>6</h3>
        </div>
        <div className="bg-red-500 w-full h-96">
          <h3>7</h3>
        </div>
        <div className="bg-blue-500 w-full h-96">
          <h3>8</h3>
        </div>
        <div className="bg-green-500 w-full h-96">
          <h3>9</h3>
        </div>
        <div className="bg-yellow-500 w-full h-96">
          <h3>10</h3>
        </div>
        <div className="bg-purple-500 w-full h-96">
          <h3>11</h3>
        </div>
        <div className="bg-pink-500 w-full h-96">
          <h3>12</h3>
        </div>
      </Slider>
    </div>
  );
};

export default CarouselCTA;
