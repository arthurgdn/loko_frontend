import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import FeedContainer from './feed/FeedContainer';
import FeedFiltering from './filters/FeedFiltering';

const HomePage = ({user, history})=>{

  useEffect(()=>{
    //Si l'utilisateur n'a pas encore bien rempli son profil
    // alors il est invité à le faire par un component spécifique
    if(user.firstName.length>0 && (!user.validatedEmail || user.userKeywords.length===0)) {
      history.push('/postSignup');
    }
  }, [user]);

  return (
    <div className="home__feed">
      <FeedFiltering/>
      <FeedContainer/>
    </div>
  );
};
const mapStateToProps = (state)=>({user: state.user});


export default connect(mapStateToProps)(HomePage);