import React from 'react';
import './Reviews.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 

const reviews = [
  {
    id: 1,
    name: 'James Chen',
    comment: 'This platform is fantastic! Highly recommend it to anyone.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Jane Smith',
    comment: 'Amazing user experience and great support team!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Mark Johnson',
    comment: 'The features are well thought out and very useful.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Michael Reeves',
    comment: 'Incredible support! They tailored strategies to my needs and safeguarded my digital presence effectively.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Sophia Reynolds',
    comment: 'Professional, knowledgeable, and proactive. They not only helped me make smart investment choices but kept me safe from online threats.',
    rating: 5,
  },
  {
    id: 6,
    name: 'Emily Carter',
    comment: 'A game changer for my finances! Their thorough investigations uncovered potential risks I hadn’t considered.',
    rating: 5,
  }
];

const Reviews = () => {
  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <section className="reviews">
      <h2 className="reviews-title">Read our reviews to find out more about us</h2>
      <hr />

      {/* Trustpilot-like rating block */}
      <div className="tpRating tpRating--center js-ratingVal tpRating--5" style={{ '--ratingVal': '4.5' }}>
      <div className="tpRating__stars">
    <img className="tpRating__icon" src="/images/logo-white.svg"  height="35" alt="Rating Stars" />
  </div>
        <div className="gI gXsM">
  <strong className="nowrap">4.3</strong>
  <div className="tpRating__starss">
  {/* Full Stars */}
  <div className="star-block full">
    <svg className="star-icon" width="24" height="24">
      <path d="M12 17.27L18.18 21L15.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L8.46 13.97L5.82 21L12 17.27Z" fill="#fff" />
    </svg>
  </div>
  <div className="star-block full">
    <svg className="star-icon" width="24" height="24">
      <path d="M12 17.27L18.18 21L15.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L8.46 13.97L5.82 21L12 17.27Z" fill="#fff" />
    </svg>
  </div>
  <div className="star-block full">
    <svg className="star-icon" width="24" height="24">
      <path d="M12 17.27L18.18 21L15.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L8.46 13.97L5.82 21L12 17.27Z" fill="#fff" />
    </svg>
  </div>
  <div className="star-block full">
    <svg className="star-icon" width="24" height="24">
      <path d="M12 17.27L18.18 21L15.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L8.46 13.97L5.82 21L12 17.27Z" fill="#fff" />
    </svg>
  </div>

  {/* Partially Green Star (80% filled) */}
  <div className="star-block partial">
    <svg className="star-icon" width="24" height="24">
      <path d="M12 17.27L18.18 21L15.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L8.46 13.97L5.82 21L12 17.27Z" fill="#fff" />
    </svg>
  </div>
</div>


</div>
        <div className="tpRating__prop">
          <a
            target="_blank"
            rel="nofollow noopener"
            href="#"
            className="link js-analyticsClick"
            data-type="trustpilot"
          >
            9,437 Reviews
          </a>
           <span> Excellent </span>
        </div>
      </div>


      {/* Review Slider */}
      <Slider {...settings}>
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <h3 className="reviewer-name">{review.name}</h3>
              <div className="review-rating">
                {Array(review.rating)
                  .fill('⭐')
                  .join('')}
              </div>
            </div>
            <p className="review-comment">"{review.comment}"</p>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Reviews;
