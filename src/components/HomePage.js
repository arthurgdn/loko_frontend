import React from 'react'
import FeedContainer from './feed/FeedContainer'
import FeedFiltering from './filters/FeedFiltering'

const HomePage = ()=>(
    <div>
        <FeedFiltering/>
        <FeedContainer/>
        
    </div>
)

export default HomePage