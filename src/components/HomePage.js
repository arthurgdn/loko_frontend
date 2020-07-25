import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import FeedContainer from './feed/FeedContainer'
import FeedFiltering from './filters/FeedFiltering'

const HomePage = ({user,history})=>{
    useEffect(()=>{
        
            console.log(user.firstName,user.validatedEmail,user.userKeywords)
            if(user.firstName.length>0 && (!user.validatedEmail || user.userKeywords.length===0)){
        
            console.log(user,'pushing')
            history.push('/postSignup')
        
    }
}
    ,[user])
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