import React from 'react'

const CardIcons = (label,text,icon) => <div className="overview-box__detail">
  <svg className="overview-box__icon">
    <use xlinkHref={`${Icons}#icon-${icon}`} />
  </svg>
  <span className="overview-box__label">{label}</span>
  <span className="overview-box__text">{text}</span>
</div>

export default CardIcons;