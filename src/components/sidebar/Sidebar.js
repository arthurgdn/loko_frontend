import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
const Sidebar = ({user }) => {
  

  return (
    <div className="sidebar">
        <div className="content-container">
        <ul>
          <Link className="button new-offer" to='/nouvelle_annonce'><li>Créer une annonce</li></Link>
          <Link to='/offers/me'><li>Mes annonces</li></Link>
          <Link to='/offers/gestion'><li>Gérer mes annonces</li></Link>
          <Link to='/me/collaborations'><li>Mes collaborations</li></Link>
          <Link to='/conversations'><li>Mes conversations</li></Link>
        </ul>
            
        </div>
    </div>
  )
};


const mapStateToProps = (state)=>({
    user : state.user
})

export default connect(
    mapStateToProps
)(Sidebar);