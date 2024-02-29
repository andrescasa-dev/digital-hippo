'use client'

import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import type SwiperType from 'swiper'
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'


type ImageSliderProps = {
  urls: string[]
}

export default function ImageSlider({urls}:ImageSliderProps) {
  const [swiper, setSwiper] = useState<null | SwiperType>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [swiperState, setSwiperState] = useState({
    isInStart: currentIndex === 0,
    isInEnd: currentIndex  === (urls.length ?? 0) -1 
  })

  useEffect(()=>{
    swiper?.on('slideChange', ({activeIndex})=>{
      setCurrentIndex(activeIndex)
      setSwiperState({
        isInStart: activeIndex === 0,
        isInEnd: activeIndex  === (urls.length ?? 0) -1 
      })
    })
  },[swiper, urls])

  const buttonStyles = "group rounded absolute bg-white h-8 w-8 z-10 grid place-items-center top-1/2 -translate-y-1/2 rounded-full transition-opacity shadow-sm opacity-0 border-2 border-zinc-200" 


  return (
    <div className="relative aspect-square overflow-hidden rounded-xl group">
      <button 
        className={cn(
          buttonStyles,
          "right-1",{
          "hidden": swiperState.isInEnd,
          "group-hover:opacity-100": !swiperState.isInEnd
          }) 
        } 
        onClick={(e)=>{
          e.preventDefault()
          swiper?.slideNext()
        }} 
        disabled={swiperState.isInEnd}
      >
        <ChevronRight className='h-4 w-4 text-zinc-700' />{' '}
      </button>
      <button 
        className={cn(
          buttonStyles,
          "left-1",{
          "hidden": swiperState.isInStart,
          "group-hover:opacity-100": !swiperState.isInStart
          }) 
        } 
        onClick={(e)=>{
          e.preventDefault()
          swiper?.slidePrev()
        }} 
        disabled={swiperState.isInStart}
      >
        <ChevronLeft className='h-4 w-4 text-zinc-700' />{' '}
      </button>
    <Swiper 
      pagination={{
        renderBullet: (index, className) => {
          return `<span class="rounded-full transition ${className}"></span>`
        },
      }}
      onSwiper={(swiper)=> setSwiper(swiper)} 
      spaceBetween={50}
      modules={[Pagination]}
      slidesPerView={1}
      className='h-full w-full'
    >
      {urls.map(url => 
        <SwiperSlide         
          key={crypto.randomUUID()}  
        >
          <Image
            className='h-full w-full object-cover object-center -z-10'
            fill 
            src={url} 
            alt="Product image" 
          />
        </SwiperSlide>
      )}
    </Swiper>
    </div>
  )
}