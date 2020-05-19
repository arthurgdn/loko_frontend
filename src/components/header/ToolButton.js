import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogout} from '../../actions/auth';
import {FiLogOut,FiFileText,FiSettings,FiUser} from 'react-icons/fi'



const ToolButton = ({startLogout}) => {
const [visible,setVisible] = useState(false)  
//We will add a way to toggle this button
  return (
      <div className="header__toolbutton" >
        
            <button onClick={()=>setVisible(!visible)} className="header__toolbutton__button">...</button> 
        
        
        {visible && (<div className="header__toolbuttoncontent">
            <Link to='/me' style={{textDecoration:'none'}}>
                <div className="header__toolbuttonelement">
                    <FiUser style={{color:'white'}}/>
                    <h3>Votre profil</h3>
                </div>
               
            </Link>
            <Link to='/offers/gestion' style={{textDecoration:'none'}}>
                <div className="header__toolbuttonelement"><FiFileText style={{color:'white'}}/><h3>Vos annonces</h3></div>
                
            </Link>
            <Link to='/settings' style={{textDecoration:'none'}}>
                <div className="header__toolbuttonelement">
                    <FiSettings style={{color:'white'}}/><h3>Paramètres</h3>
                </div>
                </Link>
            <div className="header__toolbuttonelement">
                <FiLogOut style={{color:'white'}}/>
                <h3 onClick={startLogout}  >Se déconnecter</h3> 
            </div>
             
        </div>) }
        
      </div>
  )
};


const mapStateToProps = (state)=>({
    user : state.user
})
const mapDispatchToProps = (dispatch)=>({
    startLogout : ()=>dispatch(startLogout())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ToolButton);