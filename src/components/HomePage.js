import React from 'react'
import FeedContainer from './feed/FeedContainer'
import FeedFiltering from './filters/FeedFiltering'

const HomePage = ()=>(
    <div className="home__feed">
        <FeedFiltering/>
        <FeedContainer/>
        
    </div>
)

export default HomePage