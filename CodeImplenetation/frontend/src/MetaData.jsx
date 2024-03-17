import React from 'react'
import Helmet from 'react-helmet'

const MetaData = ({title}) => {
  return (
    <div>
        <Helmet>
            <title>{title}</title>
        </Helmet>
    </div>
  )
}

export default MetaData