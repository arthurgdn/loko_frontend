import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
const GroupsList = ({userGroups})=>
    (
        <div>
            {userGroups.length>0 && userGroups.map((group)=>(
                <div key={group._id}>
                    
                    <Link to={'/group/'+group._id}>
                        {group.hasImage&& (<img className="header__picture" src={process.env.DEV_URL+"/group/"+group._id+"/image"}/>)}
                        <h3>{group.name}</h3>
                    </Link>
                    <p>{group.description}</p>
                </div>))}
        </div>
    )

const mapStateToProps = (state)=>({
    userGroups : state.user.userGroups
})
export default connect(mapStateToProps)(GroupsList)