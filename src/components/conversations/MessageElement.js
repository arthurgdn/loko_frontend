import React from 'react'
import moment from 'moment'
export default ({author,content,createdAt})=>(
    <div>
        <h3>{author.firstName} {author.lastName} - {moment(createdAt).format('MMMM Do, YYYY')}</h3>
        <p>{content}</p>
        
    </div>
)