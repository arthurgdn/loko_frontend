import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {AiOutlineSearch} from 'react-icons/ai';
import {startSetCollaborators} from '../../actions/user';
const CollaboratorsList = ({
  collaborators, startSetCollaborators, setCollaboratorsError
})=>{
  const [loadedCollaborators, setLoadedCollaborators] = useState([]);
  const [displayedCollaborators, setDisplayedCollaborators] = useState([]);
  const [error, setError]=useState('');
  const [displayIcon, setDisplayIcon]=useState(true);
  const [searchText, setSearchText] = useState('');
  useEffect(()=>{
    startSetCollaborators();
  }, []);
  useEffect(()=>{
    setError(setCollaboratorsError);
  }, [setCollaboratorsError]);
  useEffect(()=>{
    //On vérifie qu'on a le bon format pour la liste des collaborateurs
    if(
      collaborators.length>0 &&
            Object.keys(collaborators[0]).length===3 ||
            collaborators.length===0
    ) {
      setLoadedCollaborators(collaborators);
      setDisplayedCollaborators(collaborators);
    }
  }, [collaborators, startSetCollaborators]);

  return (
    <div className="collaborator__container">

      {!loadedCollaborators.length>0
        ? !error &&
                <p className="manager__no-offer">Vous ne suivez personne pour l&apos;instant</p>
        : <div>
          <h3>
                        Vous suivez {loadedCollaborators.length} personne
            {loadedCollaborators.length>1&&'s'}
          </h3>
          <div className="feed__search">
            {displayIcon &&
                <i className="feed__icon show-for-desktop">
                  <AiOutlineSearch className="show-for-desktop"/>
                </i>
            }
            <input
              type="text"
              onFocus={()=>setDisplayIcon(false)}
              onBlur={()=>setDisplayIcon(true)}
              value={searchText}
              className="feed__input"
              onChange={(e)=>{
                setSearchText(e.target.value);
                setDisplayedCollaborators(
                  loadedCollaborators.filter((collab)=>
                    (collab.firstName+' '+collab.lastName)
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase()))
                );
              }}
              placeholder="Rechercher une personne que vous suivez"
            />
          </div>
          {displayedCollaborators.map((collaborator)=>
            <div key={collaborator.collaborator} className="collaborator__list">
              <Link
                to={'/profile/'+collaborator.collaborator}
                className="offer-element__comment-subheader"
              >
                <img
                  className="header__picture offer-element__comment-picture"
                  src={`${process.env.DEV_URL}/users/
                                    '${collaborator.collaborator}/avatar`}
                />
                <p>{collaborator.firstName} {collaborator.lastName}</p>
              </Link>

            </div>
          )}
        </div>


      }
      {error && <p>{error}</p>}
    </div>

  );
};
const mapStateToProps = (state)=>({
  collaborators: state.user.collaborators,
  setCollaboratorsError: state.user.setCollaboratorsError
});
const mapDispatchToProps = (dispatch)=>({
  startSetCollaborators: ()=>
    dispatch(startSetCollaborators())
});

export default connect(mapStateToProps, mapDispatchToProps)(CollaboratorsList);