import React , { useEffect } from 'react'
import '../Overview/overview.style.scss'
import {useSelector,useDispatch} from 'react-redux'
import {grabLoading, grabBookedTours} from '../../redux/tours/tours.selectors'
import Loading from '../../components/onLoading/OnLoading'
import Card from '../../components/card/Card'

const MyBookings = () => {
  const tours = useSelector(grabBookedTours)
  const onLoading = useSelector(grabLoading)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({ type: 'GRAB_BOOKED_TOURS_START'})
  }
  ,[dispatch])

  return (
    onLoading ? <Loading /> 
    :
    <section className="overview">
      <div className="card-container">
      { tours !== null && onLoading === false && tours.map(
          x => <Card key={x._id} tour={x} /> 
        )
      }
      </div>
    </section>  
  )
}

export default MyBookings;