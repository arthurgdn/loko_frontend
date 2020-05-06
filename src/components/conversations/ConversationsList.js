import React, {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const ConversationsList = ({displayedConversations,user_id})=>{
    
    return (
        <div>
        {!displayedConversations.length>0? (<p>Aucunes conversations pour l'instant</p>) : 
            displayedConversations.map((conversation)=> (
                <div key={conversation._id}>
                    <Link to={'/conversation/'+conversation._id}>
                        {conversation.image && <img className="header__picture" src={process.env.DEV_URL+"/conversation/"+conversation._id+"/image"}/>}
                        {conversation.name?(<p>{conversation.name}</p>):
                            conversation.members.map((member)=>(<div key={member.member}>
                                {member.member===user_id?(<p></p>):(<p>{member.firstName + ' '+member.lastName + '-'}</p>)}
                                </div>)
                                )
                            
                        }
                        
                    </Link>
                    
                </div>
            ))
        }
        </div>
        
    )
}
const mapStateToProps = (state)=>({
    
    user_id : state.user._id
})


export default connect(mapStateToProps)(ConversationsList)