import React , { useEffect } from 'react'
import './overview.style.scss'
import Card from '../../components/card/Card'
import {connect} from 'react-redux'
import {fetchToursStart} from '../../redux/tours/tours.action'
import OnLoading from '../../components/onLoading/OnLoading'

const OverviewPage = ({tours,onLoading,fetchToursStart}) => {
  useEffect(() => {
    fetchToursStart()
  }
  , [fetchToursStart])

  console.log('TOURS', tours);
  return (
    onLoading ? <OnLoading /> 
    :
    <section className="overview">
      <div className="card-container">
      { tours !== null && onLoading === false && tours.data.map(
          el => <Card key={el._id} tour={el} />
        )
      }
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