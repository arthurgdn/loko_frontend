import React from 'react'
import {Link} from 'react-router-dom'
export default ({groups})=>{
    return (
        <div className="content-container">
            {groups.length>0 ? groups.map((group)=>(
                <div className="group__list-element" key={group._id}>
                            <Link to={'/group/'+group._id} className="offer-element__comment-subheader">
                                <img className="header__picture offer-element__comment-picture" src={process.env.DEV_URL+"/group/"+group._id+"/image"}/>
                                <p>{group.name}</p>
                            </Link>
                            <p className="group__description">{group.description.length>60?group.description.slice(0,60)+'...':group.description}</p>
                        </div>
                )):(<p className="search__infotext">Aucun groupe ne correspond à votre recherche</p>)}
        </div>
        )
}