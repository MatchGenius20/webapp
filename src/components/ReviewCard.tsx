// components/ReviewCard.tsx
'use client'
import Image from 'next/image'
import { FC, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

const reviews = [
  {
    title: 'Great Platform',
    content:
      'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit. Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
    name: 'Piyush Jaiswal',
    rating: 5,
    backgroundColor: 'bg-primary',
    textColor: 'text-white',
    quoteImage: '/images/feed.png',
    profilePicUrl: '/images/user.png',
  },
  {
    title: 'Great Platform',
    content:
      'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit. Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
    name: 'Piyush Jaiswal',
    rating: 5,
    backgroundColor: 'bg-white',
    textColor: 'text-gray-900',
    quoteImage: '/images/feed2.png',
    profilePicUrl: '/images/user.png',
  },
  {
    title: 'Great Platform',
    content:
      'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit. Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
    name: 'Piyush Jaiswal',
    rating: 5,
    backgroundColor: 'bg-white',
    textColor: 'text-gray-900',
    quoteImage: '/images/feed2.png',
    profilePicUrl: '/images/user.png',
  },
  {
    title: 'Great Platform',
    content:
      'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit. Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
    name: 'Piyush Jaiswal',
    rating: 5,
    backgroundColor: 'bg-white',
    textColor: 'text-gray-900',
    quoteImage: '/images/feed2.png',
    profilePicUrl: '/images/user.png',
  },
  {
    title: 'Great Platform',
    content:
      'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit. Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
    name: 'Piyush Jaiswal',
    rating: 5,
    backgroundColor: 'bg-white',
    textColor: 'text-gray-900',
    quoteImage: '/images/feed2.png',
    profilePicUrl: '/images/user.png',
  },
  // ... (repeat for the remaining reviews)
]

const ReviewCard: FC = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const getCardStyle = (index: number) => {
    if (index % 3 === 0) {
      return {
        backgroundColor: 'bg-primary',
        textColor: 'text-white',
        quoteImage: '/images/feed.png',
        profilePicUrl: '/images/user.png',
      }
    }
    return {
      backgroundColor: 'bg-white',
      textColor: 'text-gray-900',
      quoteImage: '/images/feed2.png',
      profilePicUrl: '/images/user.png',
    }
  }

  return (
    <div className="bg-gray-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 text-left mb-12">
        What our students are <br className="hidden md:block" /> saying about us
      </h1>
      <div className="relative swiper-container">
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 3 },
          }}
          navigation
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class="${className} custom-bullet"></span>`
            },
          }}
          autoplay={{ delay: 3000 }}
          modules={[Navigation, Pagination, Autoplay]}
          className="flex flex-wrap justify-center gap-6"
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        >
          {reviews.map((review, index) => {
            const cardStyle = getCardStyle(index - activeIndex)
            return (
              <SwiperSlide key={index}>
                <div
                  className={`${cardStyle.backgroundColor} p-6 rounded-lg shadow-lg w-full h-full flex flex-col justify-between`}
                  style={{ minHeight: '400px', maxWidth: '300px' }}
                >
                  <div>
                    <h2
                      className={`text-lg sm:text-xl font-bold ${cardStyle.textColor} mb-4`}
                    >
                      {review.title}
                    </h2>
                    <div className="relative">
                      <div
                        className="absolute top-0 left-0 transform -translate-x-2 -translate-y-2 w-8 h-8 rounded-full flex justify-center items-center"
                        style={{
                          backgroundColor:
                            cardStyle.backgroundColor === 'bg-primary'
                              ? 'white'
                              : '#443EDE',
                        }}
                      >
                        <Image
                          src={cardStyle.quoteImage}
                          alt="Quote mark"
                          width={16}
                          height={16}
                        />
                      </div>
                      <p
                        className={`ml-8 ${cardStyle.textColor} text-sm sm:text-base`}
                      >
                        {review.content}
                      </p>
                    </div>
                  </div>
                  <div className="flex mt-4 pt-4 border-t border-gray-200 items-center">
                    <div className="w-8 h-8 bg-[#FDEFEE] rounded-full overflow-hidden border-2 border-gray-200 flex justify-center items-center">
                      <Image
                        src={cardStyle.profilePicUrl}
                        alt="Profile picture"
                        width={100}
                        height={100}
                        className="rounded-full m-0 p-1 object-contain"
                      />
                    </div>
                    <div className="ml-3">
                      <p className={`font-semibold ${cardStyle.textColor}`}>
                        {review.name}
                      </p>
                      <div className="flex items-center">
                        {[...Array(review.rating)].map((_, i) => (
                          <svg
                            key={i}
                            className="h-4 w-4 text-yellow-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.342 4.134a1 1 0 00.95.69h4.286c.969 0 1.371 1.24.588 1.81l-3.457 2.512a1 1 0 00-.364 1.118l1.342 4.134c.3.921-.755 1.688-1.54 1.118l-3.457-2.512a1 1 0 00-1.175 0l-3.457 2.512c-.785.57-1.84-.197-1.54-1.118l1.342-4.134a1 1 0 00-.364-1.118L2.171 9.561c-.784-.57-.38-1.81.588-1.81h4.286a1 1 0 00.95-.69l1.342-4.134z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
      <style jsx global>{`
        .swiper-container {
          padding-bottom: 60px; /* Increased padding for pagination */
        }
        .swiper {
          padding-bottom: 40px;
        }
        .swiper-slide {
          height: auto;
          display: flex;
          justify-content: center;
        }
        .swiper-pagination {
          bottom: 0 !important;
        }
        .custom-bullet {
          background: #443ede;
          width: 30px;
          height: 10px;
          border-radius: 10px;
          margin: 0 5px !important;
          opacity: 0.5;
          transition: opacity 0.3s;
        }
        .custom-bullet.swiper-pagination-bullet-active {
          opacity: 1;
        }
        .swiper-button-next,
        .swiper-button-prev {
          display: none;
        }
      `}</style>
    </div>
  )
}

export default ReviewCard
