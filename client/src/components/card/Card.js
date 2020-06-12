import React from 'react'
import './card.style.scss'
import {Link} from 'react-router-dom'
import Icons from './icons.svg'

const Card = ({tour:{
  imageCover,
  name,
  duration,
  difficulty,
  summary,
  startLocation,
  startDates,
  locations,
  maxGroupSize,
  price,
  ratingsQuantity,
  ratingsAverage,
  slug
}}) => {
  const format= new Date(startDates[0]).toLocaleString('en-us',{month:'long' ,year:'numeric'})
  console.log(format);
  return (
    <div className="card">
      <div className="card__header">
        <div className="card__picture">
          <div className="card__picture-overlay"></div>
          <img 
            className="card__picture-img" 
            src={require(`../../../public/img/tours/${imageCover}`)} 
            alt={name}
          />
        </div>
        <h3 className="heading-tertirary">
          <span>{name}</span>
        </h3>
      </div>
      <div className="card__details">
        <h4 className="card__sub-heading">
          {`${difficulty} ${duration} days tour`}
        </h4>
        <p className="card__text">{`${summary}`}</p>
        <div className="card__data">
          <svg className="card__icon">
            <use xlinkHref={`${Icons}#icon-map-pin`} />
          </svg>
          <span>{`${startLocation.description}`}</span>
        </div>
        <div className="card__data">
          <svg className="card__icon">
            <use xlinkHref={`${Icons}#icon-calendar`} />
          </svg>
          <span>{`${format}`}</span>
        </div>
        <div className="card__data">
          <svg className="card__icon">
            <use xlinkHref={`${Icons}#icon-flag`} />
          </svg>
          <span>{`${locations.length} stops`}</span>
        </div>
        <div className="card__data">
          <svg className="card__icon">
            <use xlinkHref={`${Icons}#icon-user`} />
          </svg>
          <span>{`${maxGroupSize} people`}</span>
        </div> 
      </div>
      <div className="card__footer">
        <p>
          <span className='card__footer-value'>
            {`$ ${price}`}
          </span>
          <span className='card__footer-text'>/ person</span>
        </p>
        <p className="card__ratings">
          <span className='card__footer-value'>
            {`${ratingsAverage} out of `}
          </span>
          <span className='card__footer-text'>
            {`${ratingsQuantity} ratings`}
          </span>
        </p>
        <Link 
          className="btn btn--green btn--small" 
          to={`/tours/${slug}`}
        >
          Details
        </Link>
      </div>
    </div>
  )
}

export default Card;