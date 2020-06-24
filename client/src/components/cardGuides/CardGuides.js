import React from 'react'

const CardGuides = ({el: {photo,name,role}}) => <div className="overview-box__detail">
  <img src={`../../assets/users/${photo}`} alt={`${name}`} className="overview-box__img"/>
  <span className="overview-box__label">
    {role === 'lead-guide'? 'Lead-guide':'Tour-guide'}
  </span>
  <span className="overview-box__text">{`${name}`}</span>
</div>

export default CardGuides;