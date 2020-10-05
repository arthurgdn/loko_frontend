import React from 'react'

export default ({history})=>{
    return (
            <div className="content-container">
                <h1 className="post-signup__title">Bienvenue sur Loko ! </h1>
                <p>Nous vous remercions pour votre inscription, vous allez pouvoir dès maintenant commencer à chercher et à créer des annonces qui vous tiennent à coeur!</p>

                <h3 className="post-signup__title">Confirmer votre compte</h3>

                <p>Nous vous avons envoyé un mail sur votre adresse d'inscription pour confirmer votre compte, veuillez effectuer cette étape pour pouvoir publier sur Loko et suivre d'autres utilisateurs, groupes, annonces etc...</p>
                
                <h3 className="post-signup__title">Remplir votre profil</h3>

                <p>Nous vous conseillons de commencer par remplir votre profil, cela nous permettra de vous conseiller des annonces en accord avec vos intérêts mais également aux autres utilisateurs de la plateforme de mieux vous connaître !</p>
                
                <button className="post-signup__button" onClick={()=>history.push('/settings')}> Remplir votre profil</button>
            </div>
        )
}

