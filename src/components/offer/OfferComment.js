import React from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'

export default ({publisherId,publisherName,content,createdAt})=>(
    <div>
        <Link to={'/profile/'+publisherId}>
            <img className="header__picture" src={process.env.DEV_URL+"/users/"+publisherId+"/avatar"}/>
            <h3>{publisherName}</h3>
        </Link>
        <span>{moment(createdAt).format('MMMM Do, YYYY')}</span>
        <p>{content}</p>
    </div>
)