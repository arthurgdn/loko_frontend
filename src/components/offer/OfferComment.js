import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';

export default ({
  publisherId, publisherName, content, createdAt
})=>
  <div className="offer-element__comment-display">
    <div className="offer-element__comment-header">
      <Link to={'/profile/'+publisherId} className="offer-element__comment-subheader">
        <img
          className="header__picture offer-element__comment-picture"
          src={process.env.DEV_URL+'/users/'+publisherId+'/avatar'}/>
        <p>{publisherName} </p>
      </Link>

      <span>{moment(createdAt).lang('fr').fromNow()}</span>

    </div>

    <p className="offer-element__comment-content" dangerouslySetInnerHTML={{ __html: content }}></p>
  </div>;
