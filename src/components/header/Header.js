import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import ToolButton from './ToolButton'



const Header = ({user }) => {
  

  return (
    <header className="header">
    
    <div className="header__content"> 
        <Link className="header__title" to='/home'>
            <h1>Loko</h1>
        </Link>
        <div className="header__profile">
            <Link className="header__user" to='/me'>
                <img className="header__picture" src={process.env.DEV_URL+"/users/"+user._id+"/avatar"}/>
        
                <h3>{user.firstName}  {user.lastName}</h3>
            </Link>
            <ToolButton/>
        </div>
        
        </div>
        
           
      </header>
  )
};


const mapStateToProps = (state)=>({
    user : state.user
})

export default connect(
    mapStateToProps
)(Header);