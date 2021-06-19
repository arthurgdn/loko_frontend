import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {AiOutlineCheckCircle} from 'react-icons/ai';
import {TiDeleteOutline} from 'react-icons/ti';
import {startSetCollaborationDemands, startNewCollaboration} from '../../actions/user';
const CollaborationDemandsList = ({
  collaborationDemands,
  startSetCollaborationDemands,
  startNewCollaboration,
  setCollaborationDemandsError,
  newCollabError
})=>{
  const [displayedDemands, setDisplayedDemands] = useState([]);
  const [error, setError]=useState('');
  useEffect(()=>{
    startSetCollaborationDemands();
  }, []);
  useEffect(()=>{
    setError(setCollaborationDemandsError);
  }, [setCollaborationDemandsError]);

  useEffect(()=>{
    setError(newCollabError);
  }, [newCollabError]);
  useEffect(()=>{
    //On vérifie qu'on a le bon format pour la liste des demandes
    if(
      collaborationDemands.length>0 &&
            Object.keys(collaborationDemands[0]).length===3 ||
            collaborationDemands.length===0
    ) {
      setDisplayedDemands(collaborationDemands);
    }
  }, [collaborationDemands, startSetCollaborationDemands]);
  const accept=(e)=>{
    const collaborator = e.currentTarget.id.substr(6, e.currentTarget.id.length);

    startNewCollaboration(collaborator, 'accept');
  };
  const reject = (e)=>{
    const collaborator = e.currentTarget.id.substr(6, e.currentTarget.id.length);

    startNewCollaboration(collaborator, 'reject');
  };
  return (
    <div>

      {displayedDemands.length>0 &&
            <div>
              <h3>Personne{displayedDemands.length>1&&'s'} souhaitant vous suivre</h3>
              {displayedDemands.map((demand)=>{return (
                <div key={demand.demand} className="collaborator__list">
                  <Link
                    to={'/profile/'+demand.demand}
                    className="offer-element__comment-subheader"
                  >
                    <img
                      className="header__picture offer-element__comment-picture"
                      src={process.env.DEV_URL+'/users/'+demand.demand+'/avatar'}
                    />
                    <p>{demand.firstName} {demand.lastName}</p>
                  </Link>
                  <div className="collaborator__button-container">
                    <button
                      className="manager__button"
                      id={'accept'+demand.demand}
                      onClick={accept}><AiOutlineCheckCircle
                      /></button>
                    <button
                      className="manager__button"
                      id={'reject'+demand.demand}
                      onClick={reject}
                    ><TiDeleteOutline/></button>
                  </div>
                </div>
              );})}
            </div>}
      {error && <p>{error}</p>}
    </div>

  );
};
const mapStateToProps = (state)=>({
  collaborationDemands: state.user.collaborationDemands,
  setCollaborationDemandsError: state.user.setCollaborationDemandsError,
  newCollabError: state.user.newCollabError
});
const mapDispatchToProps = (dispatch)=>({
  startSetCollaborationDemands: ()=>dispatch(startSetCollaborationDemands()),
  startNewCollaboration: (collaborator, status)=>
    dispatch(startNewCollaboration(collaborator, status))
});

export default connect(mapStateToProps, mapDispatchToProps)(CollaborationDemandsList);