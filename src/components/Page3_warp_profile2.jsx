import React from 'react'
import { insta_white_ic, notion_white_ic, github_white_ic, } from './Image';
import { Link } from 'react-router-dom'
const Page3_warp_profile2 = () => {
  return (
    <div 
    className="page3_warp_profile2 page3_warp_profile"
    alt="se"
    >
    <div className="page3_warp_profile_ic_box">
        <Link to={"https://github.com/changhyoun"} target='_blank'>
          <img src={github_white_ic} alt="github_white_ic" />
        </Link>
        <Link to={"https://www.instagram.com/chhy02_14?igsh=MWRxYThreTRxNG52bQ%3D%3D&utm_source=qr"} target='_blank'>
          <img src={insta_white_ic} alt="insta_white_ic" />
        </Link>
        <Link to={"https://www.notion.so/6681cf5058ad47d88a218527c6df4dc8"} target='_blank'>
          <img src={notion_white_ic} alt="notion_white_ic" />
        </Link>
    </div>
  </div>
  )
}

export default Page3_warp_profile2