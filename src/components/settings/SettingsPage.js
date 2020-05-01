import React,{useState} from 'react'
import EditProfilePage from './EditProfilePage'
import EditUserForm from './EditUserForm'
import PersonnalSettings from './PersonnalSettings'
export default ()=>{
    const [selectedTab,setSelectedTab] = useState(0)
    return (
        <div>
            <button onClick={()=>setSelectedTab(0)}>Mon Compte</button>
            <button onClick={()=>setSelectedTab(1)}>Identité</button>
            <button onClick={()=>setSelectedTab(2)}>Profil</button>
            {selectedTab===0 && (<PersonnalSettings/>)}
            {selectedTab===1 && (<EditUserForm/>)}
            {selectedTab===2 && (<EditProfilePage/>)}
        </div>
    )
}
