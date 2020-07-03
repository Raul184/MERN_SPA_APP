import React from 'react'
import CardPics from './cardPics/CardPics'
const TourPgImages = ({images}) => {
  return (
    <section className="section-pictures">
        {images.map(
          (el,i) => <CardPics key={i} el={el} i={i}/>
        )}
    </section>
  )
}
export default TourPgImages;