import React from 'react'
import Icons from '../../assets/icons.svg'
const CardReviews = ({el:{review}}) => <div className="reviews__card">
  <div className="reviews__avatar">
    <img 
      className="reviews__avatar-img"
      src={`/img/users/${review.user.photo}`} 
      alt={`${review.user.name}`} 
    />
    <h6 className="reviews__user">
      {review.user.name}
    </h6>
  </div>
  <p className="reviews__text"></p>
  <div className="reviews__rating">
    <svg className="reviews__star reviews__start--active">
      <use xlinkHref={`${Icons}#icon-star`} />
    </svg>
  </div>
</div>

export default CardReviews;