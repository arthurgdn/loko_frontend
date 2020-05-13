import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import moment from 'moment'

const FeedGroupElement =  ({name,description,locationText,hasImage,_id,keywords})=>
    
    
    (
        <div>
            
            
            <Link to={'/group/'+_id}><h3>{name}</h3></Link>
            <p>{description}</p>
            <p>Groupe se situant à {locationText} </p>
            
            {hasImage&& (<img  src={process.env.DEV_URL+"/group/"+_id+"/image"}/>)}
            
            <ul>{keywords.map((keyword)=>(<li key={keyword.name}><Link to={'/keyword/'+keyword._id}>{keyword.name}</Link></li>))}</ul>
            
            

        </div>
        )
        
        
         
         
         
    
const mapStateToProps = (state)=>({
    user : state.user
})


export default connect(mapStateToProps)(FeedGroupElement)