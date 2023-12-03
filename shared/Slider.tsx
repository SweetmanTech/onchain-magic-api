import React from "react"
import { Swiper, SwiperSlide, SwiperProps } from "swiper/react"

import "swiper/css"
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ISlider {
  children: React.ReactNode[]
  sliderProps: SwiperProps
  className?: string
  slideClassName?: string
  style?: any
  sliderStyle?: any
}

function Slider({ children, sliderProps, className, slideClassName, style, sliderStyle }: ISlider) {
  return (
    <Swiper {...sliderProps} className={className} style={style || {}}>
      {children.map((item, i) => (
        <SwiperSlide
          key={i}
          className={slideClassName ? slideClassName : ""}
          style={sliderStyle || {}}
        >
          {item}
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Slider
