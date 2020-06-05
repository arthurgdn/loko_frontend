import React from 'react'
import {Link} from 'react-router-dom'
export default ({groups})=>{
    return (
        <div>
            {groups.length>0 ? groups.map((group)=>(
                <div key={group._id}>
                    
                    <Link to={'/group/'+group._id}>
                        {group.hasImage&& (<img className="header__picture" src={process.env.DEV_URL+"/group/"+group._id+"/image"}/>)}
                        <h3>{group.name}</h3>
                    </Link>
                    <p>{group.description.length>60?group.description.slice(0,60)+'...':group.description}</p>
                </div>)):(<p className="search__infotext">Aucun groupe ne correspond à votre recherche</p>)}
        </div>
        )
}