import React from 'react';

export default ()=>
  <div className="showcase__promotion">
    <div className="showcase__text-wrapper">
      <p>Avec Loko, plateforme d&apos;annonces locales,
      rejoignez une communauté de proximité basée sur l&apos;échange de biens et de services !</p>
    </div>
    <div className="showcase__image-wrapper">
      <img className="showcase__image" src={process.env.DEV_URL+'/showcase/image'}/>
    </div>

  </div>;
