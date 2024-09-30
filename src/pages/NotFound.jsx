import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import "./NotFound.scss"

const NotFound = () => {
  return (
    <>
    <div id="NotFound">
        <Header/>
        <div className="NotFound_inner">
            <ul>
                
                <li><span>THIS</span> PAGE WAS NOT FOUND</li>
                <li>THIS PAGE <span>WAS</span> NOT FOUND</li>
                <li>THIS <span>PAGE</span> WAS NOT FOUND</li>
                <li>THIS PAGE WAS NOT FOUND</li>
                <li>THIS PAGE WAS NOT <span>FOUND</span></li>
                <li>THIS PAGE WAS <span>NOT</span> FOUND</li>
                
            </ul>
        </div>
        <div className="rt_back_gra">
                
        </div>
        <div className="lt_back_gra">
                
        </div>
       
    </div>
    <Footer/>
    </>
    
  )
}

export default NotFound