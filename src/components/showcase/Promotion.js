import React from 'react'

export default ()=>(
    <div className="showcase__promotion">
    <div className="showcase__text-wrapper">
        <h3 className="showcase__text">La plateforme d'annonces locales pour recréer un lien au sein des communautés de proximité.</h3>
    </div>
    <div className="showcase__image-wrapper">
        <img className="showcase__image" src={process.env.DEV_URL+"/showcase/image"}/>
    </div>
    
    </div>
)