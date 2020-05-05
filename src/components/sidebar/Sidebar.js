import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
const Sidebar = ({user }) => {
  

  return (
    <div className="sidebar">
        <div className="content-container">
            <Link className="button new-offer" to='/nouvelle_annonce'>Créer une annonce</Link>
            <Link to='/offers/me'>Mes annonces</Link>
            <Link to='/offers/gestion'>Gérer mes annonces</Link>
            <Link to='/me/collaborations'>Mes collaborations</Link>
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