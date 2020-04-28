import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
const Sidebar = ({user }) => {
  

  return (
    <div className="sidebar">
        <div className="content-container">
            <Link className="button new-offer" to='/nouvelle_annonce'>Créer une annonce</Link>
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