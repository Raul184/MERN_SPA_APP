import React from 'react'
import './tour.style.scss'
import {useSelector} from 'react-redux'
import {grab1Tour} from '../../redux/tours/tours.selectors'
import Map from '../../components/mapbox/Mapbox'
import TourPgHeader from '../../components/TourPgHeader'
import TourPgDescription from '../../components/TourPgDescription'
import TourPgFooter from '../../components/TourPgFooter'
import TourPgImages from '../../components/TourPgImages'
const Tour = ({match}) => {
  const tour = useSelector(grab1Tour(match.params.tourId))
  const{
    imageCover,
    name,
    duration,
    startLocation,
    startDates,
    difficulty,
    maxGroupSize,
    ratingsAverage,
    description,
    locations,
    guides,
    images} = tour
  const format= new Date(startDates[0]).toLocaleString(
    'en-us',{month:'long' ,year:'numeric'}
  )
  const parapraphs = description.split('\n');
  return (
    <>
      <TourPgHeader 
        name={name} 
        imageCover={imageCover}
        duration={duration} 
        startLocation={startLocation} 
      />
      <TourPgDescription
        format={format}
        name={name}
        difficulty={difficulty}
        maxGroupSize={maxGroupSize}
        ratingsAverage={ratingsAverage}
        guides={guides}
        parapraphs={parapraphs}
      />
      <TourPgImages images={images} />
      <section className="section-map">
        <div id="map" data-locations={`${JSON.stringify(locations)}`}></div>
        <Map/>
      </section>
      {/* <div className="section-reviews">
        <div className="reviews">
          {reviews.map(el => <CardReviews el={el} />)}
        </div>
      </div> */}
      <TourPgFooter images={images}/>
    </>
  )
}
export default Tour;