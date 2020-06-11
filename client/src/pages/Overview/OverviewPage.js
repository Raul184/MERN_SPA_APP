import React , { useEffect } from 'react'
import './overview.style.scss'
// import Card from '../../card/Card'
import {connect} from 'react-redux'
import {fetchToursStart} from '../../redux/tours/tours.action'

const OverviewPage = ({tours,onLoading,fetchToursStart}) => {
  useEffect(() => {
    console.log('RENDERED');
    fetchToursStart()
  }
  , [fetchToursStart])
  return (
    <section className="overview">
      <div className="card-container">
          <h1>OVERVIEW PAGE</h1>
      </div>
    </section>  
  )
}

const mapStateToProps = state => {
  return {
    tours: state.toursDb.tours,
    onLoading: state.toursDb.loading
  }
}

export default connect(
  mapStateToProps ,
  {fetchToursStart}
)(OverviewPage);