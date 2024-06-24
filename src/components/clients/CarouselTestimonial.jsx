import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Profile from './Profile';

const CarouselTestimonial = () => {
  return (
    <>
      <Carousel
       
        showArrows={false}
        showIndicators={true}
        showThumbs={false}  
        autoPlay={true}
        infiniteLoop={true}
      >
        <div>
          <Profile textHeading="SUFAIRATH"  withQuotes={true} text="The flexibility and affordability of renting from Emirates Drive made my business trip stress-free. I couldn't have asked for a better experience." path="/images/testimonial1.jpeg"/>
        </div>
        <div>
          <Profile textHeading="SAVAD" withQuotes={true} text="I highly recommend Emirates Drive for their exceptional service and affordable rates. The car was clean, well-maintained, and perfect for exploring the city." path="/images/testimonial3.jpeg"/>
        </div>
        <div>
          <Profile textHeading="RAMEES" withQuotes={true}  text="This was my second time renting from Emirates Drive, and once again, they exceeded my expectations. Consistent quality and service!" path="/images/testimonial4.jpeg"/>
        </div>
        <div>
          <Profile textHeading="ROSHNA" withQuotes={true} text="Renting from Emirates Drive made my vacation memorable. The car was reliable, and I appreciated the ease of extending my rental when my plans changed." path="/images/testimonial5.jpeg"/>
        </div>
        <div>
          <Profile textHeading="NISAR" withQuotes={true} text="Thank you, Emirates Drive, for making my family road trip so enjoyable. The car was spacious and comfortable, and the rental process was quick and easy." path="/images/testimonial6.jpeg"/>
        </div>
       
      </Carousel>
    </>
  );
};

export default CarouselTestimonial;
