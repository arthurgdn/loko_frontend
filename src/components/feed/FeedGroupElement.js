import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {GoLocation} from 'react-icons/go';

const FeedGroupElement =  ({
  name, description, locationText, _id, keywords
})=>


  <div className="group__content-display group__feed-display">
    <div className="profile__header">
      <img className="profile__picture" src={process.env.DEV_URL+'/group/'+_id+'/image'}/>
      <h3>
        <Link style={{textDecoration: 'none', color: 'white'}} to={'/group/'+_id}>{name}</Link>
      </h3>
    </div>
    <div className="group__body">
      {locationText && <p className="profile__location"><GoLocation/> {locationText}</p>}
      <div className="keyword__container">
        <div className="keyword__list">
          {keywords.map((keyword)=>
            <Link className="keyword__link" key={keyword._id} to={'/keyword/'+keyword._id}>
              <button>
                {keyword.name}
              </button>
            </Link>)
          }
        </div>
      </div>
      <p>{description}</p>
    </div>
  </div>;
const mapStateToProps = (state)=>({user: state.user});


export default connect(mapStateToProps)(FeedGroupElement);