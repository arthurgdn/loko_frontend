import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import FeedContainer from './feed/FeedContainer'
import FeedFiltering from './filters/FeedFiltering'

const HomePage = ({user})=>{
    useEffect(()=>{
        if(user.validatedEmail){
            
        }
    },[])
        return (
            <div className="home__feed">
                <FeedFiltering/>
                <FeedContainer/>
                
            </div>
        )
    }
const mapStateToProps = (state)=>({
    user:state.user
})
    

export default connect(mapStateToProps)(HomePage)