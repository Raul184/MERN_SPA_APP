import React , { useEffect } from 'react'
import './overview.style.scss'
// import Card from '../../card/Card'


const OverviewPage = () => {
  useEffect(() => {
    console.log('RENDERED');
  }
  , [])
  return (
    <section class="overview">
      <div class="card-container">
          <h1>OVERVIEW PAGE</h1>
      </div>
    </section>  
  )
}

export default OverviewPage;