import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import {FiSearch,FiMessageCircle,FiFileText, FiSettings,FiLogOut} from 'react-icons/fi'
import {FaUserFriends,FaUsers} from 'react-icons/fa'
import {MdCreate} from 'react-icons/md'
import {startLogout} from '../../actions/auth'
const Sidebar = ({user,startLogout }) => {
  

  return (
    <div className="sidebar">
        <div className="sidebar-container">
        <div className="sidebar__navigation">
          <div className="sidebar__link-container">
            <Link style={{textDecoration:'none'}}  to='/rechercher'>
              <div className="sidebar__link">
                <FiSearch/><p className="show-for-desktop">Rechercher</p>
              </div>
              
            </Link>
          </div>
          <div className="sidebar__link-container">
            <Link style={{textDecoration:'none'}} to='/nouvelle_annonce'>
              <div className="sidebar__link">
                <MdCreate/><p className="show-for-desktop">Créer une annonce</p>
              </div>
              
            </Link>
          </div>
          <div className="sidebar__link-container">
            <Link style={{textDecoration:'none'}}  to='/offers/gestion'>
              <div className="sidebar__link">
                <FiFileText/><p className="show-for-desktop">Vos annonces</p>
              </div>
            </Link>
          </div>
          <div className="sidebar__link-container">
            <Link style={{textDecoration:'none'}}  to='/me/collaborations'>
              <div className="sidebar__link">
                <FaUserFriends/><p className="show-for-desktop">Personnes suivies</p>
              </div>
            </Link>
          </div>
          <div className="sidebar__link-container">
            <Link style={{textDecoration:'none'}}  to='/conversations'>
              <div className="sidebar__link">
                <FiMessageCircle/><p className="show-for-desktop">Conversations</p>
              </div>
            
            </Link>
          </div>
          <div className="sidebar__link-container">
            <Link style={{textDecoration:'none'}}  to='/groups'>
              
              <div className="sidebar__link">
                <FaUsers /><p className="show-for-desktop">Groupes</p>
              </div>
            
            </Link>
          </div>

          <div className="sidebar__link-container">
            <Link style={{textDecoration:'none'}}  to='/settings'>
              
              <div className="sidebar__link">
                <FiSettings /><p className="show-for-desktop">Paramètres</p>
              </div>
            
            </Link>
          </div>

          <div className="sidebar__link-container">
            
              
              <div className="sidebar__link sidebar__logout" onClick={startLogout}  >
                <FiLogOut  /><p className="show-for-desktop">Se déconnecter</p>
              </div>
            
            
          </div>
        
        </div>
      </div>      
    </div>
  )
};


const mapStateToProps = (state)=>({
    user : state.user
})

const mapDispatchToProps = (dispatch)=>({
  startLogout : ()=>dispatch(startLogout())
})

export default connect(mapStateToProps,mapDispatchToProps)(Sidebar);