'use client'

import Image from 'next/image'

import { useState } from 'react'

import LoadingSpinner from '#components/animation/loadingSpinner'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '#components/ui/carousel'
import { Post } from '#types/posts.type'

interface PostCarouselProps {
  images: Post['images']
}

export default function PostCarousel({ images }: PostCarouselProps) {
  const [isImageLoad, setIsImageLoad] = useState(false)

  return (
    <Carousel className="grow h-full bg-gray-light rounded-t-lg md:rounded-t-none md:rounded-l-lg">
      <CarouselContent className="h-full">
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div key={index} className="relative h-full">
              {!isImageLoad && <LoadingSpinner variant="inset" />}
              <Image
                src={image.path}
                alt={`Post image ${index + 1}`}
                fill
                sizes="(max-width: 768px) 90vw, (max-width: 1024px) 70vw, 60vw"
                onLoad={() => setIsImageLoad(true)}
                className="object-contain"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4 disabled:pointer-events-auto" />
      <CarouselNext className="right-4 disabled:pointer-events-auto" />
    </Carousel>
  )
}
