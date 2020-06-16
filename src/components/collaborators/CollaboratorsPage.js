import React from 'react'
import CollaborationDemandsList from './CollaborationDemandsList'
import CollaboratorsList from './CollaboratorsList'
export default ()=>(
    <div>
        <div className="banner__title">
            <h3>Personnes suivies</h3>
        </div>
        
        <CollaborationDemandsList/>
        
        <CollaboratorsList/>
    </div>
)