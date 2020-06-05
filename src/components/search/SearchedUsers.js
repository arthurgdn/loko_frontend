import React from 'react'
import {Link} from 'react-router-dom'
export default ({users})=>{
    return (
        <div>
            {users.length>0 ?(
                users.map((user)=>(
                    
                    <Link to={'/profile/'+user._id} key={user._id}>
                        <img className="header__picture" src={process.env.DEV_URL+"/users/"+user._id+"/avatar"}/>
                        <h3>{user.firstName} {user.lastName}</h3>
                    </Link>
                    
                ))
            ):(<p className="search__infotext" >Aucun utilisateur ne correspond à votre recherche</p>)}
        </div>
        )
}