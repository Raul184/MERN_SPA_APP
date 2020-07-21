import React , { useEffect } from 'react'
import '../Overview/overview.style.scss'
import {useSelector,useDispatch} from 'react-redux'
import {grabTours,grabLoading} from '../../redux/tours/tours.selectors'
import Card from '../../components/card/Card'
import Loading from '../../components/onLoading/OnLoading'

const MyBookings = () => {
  // const tours = useSelector(grabTours)
  const onLoading = useSelector(grabLoading)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({ type: 'GRAB_BOOKED_TOURS'})
  }
  , 
  [dispatch])
  return (
    onLoading ? <Loading /> 
    :
    <section className="overview">
      <h1>TEST</h1>
      <div className="card-container">
      {/* { tours !== null && onLoading === false && Object.entries(tours)
      .map(el => el[1])
      .map(x => <Card key={x._id} tour={x} />)
      } */}
      </div>
    </section>  
  )
}

export default MyBookings;