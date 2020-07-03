import React from 'react'
const CardPics = ({i,el}) => <div className="picture-box">
  <img 
    className={`picture-box__img picture-box__img--${i + 1}`}
    src={require(`../../assets/imgs/tours/${el}`)} 
    alt='tour' 
  />
</div>
export default CardPics;