import React from 'react'
import moment from 'moment'
import {Link } from 'react-router-dom'
export default ({author,content,createdAt,user_id})=>(
    <div className={ author._id ===user_id ? "conversation__parent-message-user":"conversation__parent-message-other"}>
        <div className="conversation__message">
            <div className="conversation__message-header">
                {author._id ===user_id && (<span>{moment(createdAt).lang('fr').fromNow()}</span>)}
                <Link to={'/profile/'+author._id} className="conversation__message-subheader">
                    {author._id===user_id && (<p>{author.firstName} {author.lastName}</p>)}
                    <img className="header__picture offer-element__comment-picture" src={process.env.DEV_URL+"/users/"+author._id+"/avatar"}/>
                    {author._id!==user_id && (<p>{author.firstName} {author.lastName}</p>)}
                </Link>

                {author._id !==user_id && (<span>{moment(createdAt).lang('fr').fromNow()}</span>)}
            
            </div>

            <p className="conversation__message-content" dangerouslySetInnerHTML={{ __html:content }}></p>
            
            
        </div>
    </div>
    
)