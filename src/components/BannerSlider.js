import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../App.css';

const BannerSlider = () => {
  const bannerImages = [
    "/cleanbanners/banner1.png",
    "/cleanbanners/banner2.png",
    "/cleanbanners/banner3.png"
  ];

  return (
    <div className="banner-slider-wrapper">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        interval={3000}
        showThumbs={false}
        showStatus={false}
        showArrows={true}
        showIndicators={true}
        swipeable={true}
        emulateTouch={true}
        stopOnHover={false}
      >
        {bannerImages.map((src, idx) => (
          <div key={idx} className="banner-slide">
            <img
              src={src}
              alt={`Banner ${idx + 1}`}
              className="banner-slider-image"
              loading="lazy"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default BannerSlider;
