import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


const Header = ({user }) => {


  return (
    <header className="header">

      <div className="header__content">
        <Link className="header__title" to='/home'>
          <img src={process.env.DEV_URL+'/showcase/cactus_mini'}/>
          <h1>Loko</h1>
        </Link>
        <div className="header__profile">
          <Link className="header__user" to='/me'>
            <img
              className="header__picture"
              src={process.env.DEV_URL+'/users/'+user._id+'/avatar'}/>

            <h3 className="show-for-desktop">{user.firstName}  {user.lastName}</h3>
          </Link>

        </div>

      </div>


    </header>
  );
};


const mapStateToProps = (state)=>({user: state.user});

export default connect(
  mapStateToProps
)(Header);