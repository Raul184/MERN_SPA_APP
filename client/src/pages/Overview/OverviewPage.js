import React , { useEffect } from 'react'
import './overview.style.scss'
import Card from '../../components/card/Card'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {grabTours,grabLoading} from '../../redux/tours/tours.selectors'
import {fetchStart} from '../../redux/tours/tours.action'
import Loading from '../../components/onLoading/OnLoading'

const OverviewPage = ({tours,onLoading,fetchStart}) => {
  useEffect(() => {
    fetchStart()
  }
  , [fetchStart])

  return (
    onLoading ? <Loading /> 
    :
    <section className="overview">
      <div className="card-container">
      { tours !== null && onLoading === false && Object.entries(tours)
      .map(el => el[1])
      .map(el => <Card key={el._id} tour={el} />)
      }
      </div>
    </section>  
  )
}

const mapStateToProps = createStructuredSelector({
    tours: grabTours,
    onLoading: grabLoading
})

export default connect(
  mapStateToProps ,
  {fetchStart}
)(OverviewPage);