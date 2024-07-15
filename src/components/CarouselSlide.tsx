import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import ReviewCard from "./ReviewCard"


const CarouselSlide = () => {
  return (
    <div> <Carousel
    opts={{
      align: "start",
    }}
    className="w-full "
  >
    <CarouselContent>
      {Array.from({ length: 5 }).map((_, index) => (
        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
          <div className="p-1">
            <Card>
             1
             <h1>hello</h1>
             kjblqk
             ,n;nal
            </Card>
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
  </div>
  )
}

export default CarouselSlide