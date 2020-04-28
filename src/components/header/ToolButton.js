import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogout} from '../../actions/auth';




const ToolButton = ({startLogout}) => {
const [visible,setVisible] = useState(false)  
//We will add a way to toggle this button
  return (
      <div >
        <button onClick={()=>setVisible(!visible)}>...</button> 
        {visible && (<div className="header__toolbuttoncontent">
            <Link to='/me'><h3>Mon profile</h3></Link>
            <Link to='/settings'><h3>Paramètres</h3></Link>
            <Link to='/annonces'><h3>Mes annonces</h3></Link>
            <button onClick={startLogout}>Se déconnecter</button>  
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