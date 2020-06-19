import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.baseURL = process.env.DEV_URL
export default ()=>{
    const [groups,setGroups] = useState([])
    const [error,setError] = useState('')
    useEffect(()=>{
        axios.get('/suggestedgroups')
        .then((res)=>{
            setGroups(res.data)
        })
        .catch((e)=>{
             console.log(e)
            setError("Erreur lors du chargement des groupes suggérés")})
    },[])
    return (
        <div>
            {error && (<p>{error}</p>)}
            {groups.length>0 && (
                <div>
                    <h3>Groupes suggérés : </h3>
                    {groups.map((group)=>(
                        <div className="group__list-element" key={group._id}>
                            <Link to={'/group/'+group._id} className="offer-element__comment-subheader">
                                <img className="header__picture offer-element__comment-picture" src={process.env.DEV_URL+"/group/"+group._id+"/image"}/>
                                <p>{group.name}</p>
                            </Link>
                            <p className="group__description">{group.description}</p>
                        </div>
                    ))}
                </div>
            ) }
        </div>
    )
}
    
