import React from 'react'
import { Link } from 'gatsby'

const LeftAds = () => {
  return (
    <div style={{ position: 'absolute', top: '0px', left: '0px', zIndex: '1' }}>
      <Link to="https://join-adf.ly/24622109">
        <img alt='ads' border="0" src="https://cdn.adf.ly/images/banners/adfly.160x600.4.gif" width="160" height="600" title="AdF.ly - shorten links and earn money!" />
      </Link>
    </div>
  )
}

export default LeftAds
