import React from 'react'
import './card.style.scss'
import {Link} from 'react-router-dom'
import CardItem from '../card_item/CardItem'


const Card = () => {
  return (
    <div className="card">
      <div className="card__header">
        <div className="card__picture">
          <div className="card__picture-overlay">
            <img className="card__picture" src="" alt=""/>
            <img className="card__picture-img" src="" alt=""/>
            <h3 className="heading-tertirary">
              <span>TEST</span>
            </h3>
          </div>
        </div>
      </div>
      <div className="card__details">
        <h4 className="card__sub-heading">CONTENT</h4>
        <p className="card__text"></p>
          <CardItem />
      </div>
      <div className="card__footer">
        <p>
          <span className='card__footer-value'></span>
          <span className='card__footer-text'></span>
        </p>
        <p className="card__ratings">
          <span className='card__footer-value'></span>
          <span className='card__footer-text'></span>
        </p>
        <Link className="btn btn-green btn--small" to='/'>Details</Link>
      </div>
    </div>
  )
}

export default Card;