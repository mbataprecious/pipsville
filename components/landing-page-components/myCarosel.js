import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { useRef } from 'react';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box } from '@mui/material';

import { CarouselArrows } from '../carousel-utils';
import { testimonies } from './landingUtils';
// ----------------------------------------------------------------------

const RootStyle = styled(Box)(() => ({
  overflow: 'hidden',
  position: 'relative',
}));

// ----------------------------------------------------------------------

export default function MyCarousel() {
  const carouselRef = useRef(null);
  const theme = useTheme();

  const settings = {
    slidesToShow: 3,
    centerMode: true,
    centerPadding: '60px',
    rtl: Boolean(theme.direction === 'rtl'),
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, centerPadding: '0' },
      },
    ],
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <RootStyle className="mx-auto">
      <CarouselArrows
        filled
        onNext={handleNext}
        onPrevious={handlePrevious}
        sx={{
          '& .arrow': {
            marginTop: '-64px',
            '&.left': { left: 16 },
            '&.right': { right: 16 },
          },
          '& .slick-track': {
            display: 'flex',
            justifyContent: 'center',
          },
          '& .slick-arrow': {
            display: 'none',
            opacity: 0,
            height: 0,
            width: 0,
          },
        }}
      >
        <Slider ref={carouselRef} {...settings}>
          {testimonies.map(({ id, ...item }) => (
            <Box key={id}>
              <CarouselItem item={item} />
            </Box>
          ))}
        </Slider>
      </CarouselArrows>
    </RootStyle>
  );
}

// ----------------------------------------------------------------------

CarouselItem.propTypes = {
  item: PropTypes.shape({
    // image: PropTypes.string,
    title: PropTypes.string,
    testimony: PropTypes.string,
    position: PropTypes.string,
    name: PropTypes.string,
    img: PropTypes.string,
  }),
};

function CarouselItem({ item, ...rest }) {
  const { title, testimony, position, name, img } = item;

  return (
    <div {...rest} className="w-[19rem]">
      <div className="w-full bg-white p-6 rounded-[0.625rem]">
        <h6 className="text-[#0F2851] mb-2">{title}</h6>
        <p className="text-[#6E6B7B]">{testimony}</p>
      </div>
      <div className="flex flex-col mt-4 items-center">
        <img src={img} className="object-center object-cover rounded-full w-[56px] h-[56px]" alt="testimony dp" />
        <h6 className="text-[1.125rem]">{name}</h6>
        <p>{position}</p>
      </div>
    </div>
  );
}
