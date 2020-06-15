import React from 'react'

const CardPics = ({i,el:{img}}) => <div className="picture-box">
  <img 
    className={`picture-box__img picture-box__img--${i + 1}`}
    src={`/img/tours/${img}`} 
    alt='tour images' 
  />
</div>

export default CardPics;