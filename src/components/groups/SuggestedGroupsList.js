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
            setError(e)})
    },[])
    return (
        <div>
            {error && (<p>{error}</p>)}
            {groups.length>0 && groups.map((group)=>(
                <div key={group._id}>
                    
                    <Link to={'/group/'+group._id}>
                        {group.hasImage&& (<img className="header__picture" src={process.env.DEV_URL+"/group/"+group._id+"/image"}/>)}
                        <h3>{group.name}</h3>
                    </Link>
                    <p>{group.description}</p>
                </div>))}
        </div>
    )
}
    
