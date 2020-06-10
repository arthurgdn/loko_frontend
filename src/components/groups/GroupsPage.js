import React from 'react'
import {Link} from 'react-router-dom'
import GroupsList from './GroupsList'
import SuggestedGroupsList from './SuggestedGroupsList'

export default ()=> (
        <div>
            <div className="banner__title">
                <h3>Groupes</h3>
            </div>
            <Link to='/nouveau_groupe'>Créer un groupe</Link>
            <h3>Mes groupes : </h3>
            <GroupsList/>
            <h3>Suggestion de groupes : </h3>
            <SuggestedGroupsList/>
        </div>
    )
