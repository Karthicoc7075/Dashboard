import React from 'react'
import notFoundImage from '../../assets/icons/404.png'
import { Link } from 'react-router-dom'

function index() {

  return (
    <div style={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center',height:'100dvh',background:'#e8dff2'}}>
        <img src={notFoundImage} style={{width:'800px'}} />
        <Link to="/">Go to Dashboardpage</Link>
    </div>
  )
}

export default index