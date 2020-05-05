import React from 'react'
import CollaborationDemandsList from './CollaborationDemandsList'
import CollaboratorsList from './CollaboratorsList'
export default ()=>(
    <div>
        <h3>Demandes de collaboration : </h3>
        <CollaborationDemandsList/>
        <h3>Mes Collaborateurs : </h3>
        <CollaboratorsList/>
    </div>
)