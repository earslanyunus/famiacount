import { useState } from "react";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import Comments from "./Comment";
import 'swiper/css';
import 'swiper/css/pagination';



export default function CommentSection() {
    const [comments, setComments] = useState([{
        name: "John Doe",
        text:'I never thought tracking my subscription payments could be this easy',
        url: "https://plus.unsplash.com/premium_photo-1680615211040-ad309f1ac38e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
        id: 1
    },
  {
    name: "Jonathan Lee",
    text:'Finding a friend for my subscriptions is now extremely easy. Thank you Famiacount.',
    url: "https://images.unsplash.com/photo-1522556189639-b150ed9c4330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    id: 2
  }])
  return (
    <div className="container">
           <Swiper
      modules={[Pagination]}
      pagination= {
        
        {
          clickable: true,
          bulletClass:' swiper-pagination-bullet',
          bulletActiveClass:'swiper-pagination-bullet-active bg-primary-700'
        }
      }
      spaceBetween={50}
      slidesPerView={1}
      // onSlideChange={() => }
      // onSwiper={(swiper) => }
      className="w-full flex flex-col gap-14"
    >
      {comments.map((comment)=>{
        return(
            <SwiperSlide key={comment.id}>
                <Comments comment={comment.text} name={comment.name} pictureUrl={comment.url}/>
                </SwiperSlide>
        )
      })}
    
    </Swiper>
    </div>
  )
}
