// components/ReviewCard.tsx
import Image from 'next/image';
import { FC } from 'react';

const reviews = [
  {
    title: "Great Platform",
    content: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit. Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
    name: "Piyush Jaiswal",
    rating: 5,
    backgroundColor: "bg-[#443EDE]",
    textColor: "text-white",
    quoteImage: "/images/feed.png",
    profilePicUrl: "/images/user.png",
  },
  {
    title: "Great Platform",
    content: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit. Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
    name: "Piyush Jaiswal",
    rating: 5,
    backgroundColor: "bg-white",
    textColor: "text-gray-900",
    quoteImage: "/images/feed.png",
    profilePicUrl: "/images/user.png",
  },
  {
    title: "Great Platform",
    content: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit. Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
    name: "Piyush Jaiswal",
    rating: 5,
    backgroundColor: "bg-white",
    textColor: "text-gray-900",
    quoteImage: "/images/feed.png",
    profilePicUrl: "/images/user.png",
  },
];

const ReviewCard: FC = () => {
  return (
    <div className="h-128 bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 text-left mb-12 ml-8" >
        What our students are <br /> saying about us
      </h1>
      <div className="flex flex-wrap justify-center gap-6">
        {reviews.map((review, index) => (
          <div
            key={index}
            className={`${review.backgroundColor} p-6 rounded-lg shadow-lg w-80 h-96 mx-auto flex flex-col`}
          >
            <div className="flex mb-4 items-center">
              <h2 className={`text-2xl font-bold ${review.textColor}`}>
                {review.title}
              </h2>
            </div>
            <div className="relative flex-1">
              <div
                className="absolute top-0 left-0 transform -translate-x-2 -translate-y-2 w-10 h-10 rounded-full flex justify-center items-center"
                style={{
                  backgroundColor:
                    review.backgroundColor === 'bg-[#443EDE]'
                      ? 'white'
                      : '#443EDE',
                }}
              >
                <Image
                  src={review.quoteImage}
                  alt="Quote mark"
                  width={16}
                  height={16}
                />
              </div>
              <p className={`ml-8 ${review.textColor} mt-4`}>{review.content}</p>
            </div>
            <div className="flex mt-4 pt-4 border-t border-gray-200 items-center">
              <div className="w-10 bg-[#FDEFEE] h-10 rounded-full overflow-hidden border-2 border-gray-200 flex justify-center items-center">
                <Image
                  src={review.profilePicUrl}
                  alt="Profile picture"
                  width={28}
                  height={28}
                  className="rounded-full"
                />
              </div>
              <div className="ml-4">
                <p className={`font-semibold ${review.textColor}`}>{review.name}</p>
                <div className="flex items-center">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 text-yellow-500"
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
        ))}
      </div>
    </div>
  );
};

export default ReviewCard;
