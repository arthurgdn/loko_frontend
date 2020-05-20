import React from 'react'
import LoginForm from '../auth/LoginForm'
import {Link} from 'react-router-dom'
//<LoginForm/>
export default ()=>(
    <header className="showcase__header">
    
    
        <div className="header__content"> 
            <Link className="header__title" to='/'>
                <img src={process.env.DEV_URL+'/showcase/cactus_mini'}/>
                <h1>Loko</h1>
            </Link>
        <div className="header__profile">
            <LoginForm/>
        </div>
        
        </div>
        
    </header>
)