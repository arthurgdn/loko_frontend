import React,{useState} from 'react'
import EditProfileForm from './EditProfileForm'
import EditUserForm from './EditUserForm'
import PersonnalSettings from './PersonnalSettings'
export default ()=>{
    const [selectedTab,setSelectedTab] = useState(0)
    return (
        <div>
            <div className="banner__title">
                <h3>Paramètres</h3>
            </div>
            <div className="content-container">
                <div className="settings__container">
                    <EditProfileForm/>
                    <EditUserForm/>
                    <PersonnalSettings/>
                </div>
                
            </div>
            
            
        </div>
    )
}
