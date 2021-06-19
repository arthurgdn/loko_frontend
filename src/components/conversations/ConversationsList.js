import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {AiOutlineMessage} from 'react-icons/ai';
import formatConversationName from '../../utils/formatConversationName';
const ConversationsList = ({displayedConversations, user_id})=>{

  return (
    <div>
      {!displayedConversations.length>0
        ? <p className="group__text-info">Aucunes conversations pour l&apos;instant</p>
        : <div>
          <h3>Vos conversations : </h3>

          {displayedConversations.map((conversation)=>
            <div className="group__list-element" key={conversation._id}>
              <Link
                className="offer-element__comment-subheader"
                to={'/conversation/'+conversation._id}
              >
                {conversation.hasImage
                  ? <img
                    className="header__picture offer-element__comment-picture"
                    src={process.env.DEV_URL+'/conversation/'+conversation._id+'/image'}
                  />:<AiOutlineMessage className="header__picture offer-element__comment-picture"/>}
                <p>{formatConversationName(conversation, user_id)}</p>


              </Link>

            </div>
          )}
        </div>

      }
    </div>

  );
};
const mapStateToProps = (state)=>({user_id: state.user._id});


export default connect(mapStateToProps)(ConversationsList);