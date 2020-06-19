import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
const GroupsList = ({userGroups})=>
    (
        <div>
            {userGroups.length>0? (
                <div>
                    <h3>Vos groupes : </h3>
                    {userGroups.map((group)=>(
                        <div className="group__list-element" key={group._id}>
                            <Link to={'/group/'+group._id} className="offer-element__comment-subheader">
                                <img className="header__picture offer-element__comment-picture" src={process.env.DEV_URL+"/group/"+group._id+"/image"}/>
                                <p>{group.name}</p>
                            </Link>
                            <p className="group__description">{group.description}</p>
                        </div>
                    ))}
                </div>
            ):(<p className="group__text-info">Vous n'avez encore rejoint aucun groupe</p>)}
        </div>
    )

const mapStateToProps = (state)=>({
    userGroups : state.user.userGroups
})
export default connect(mapStateToProps)(GroupsList)