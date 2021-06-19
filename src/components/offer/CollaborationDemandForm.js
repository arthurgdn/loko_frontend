import React, {useState} from 'react';

export default ({onCollaborationDemandSent})=>{
  const [displayForm, setDisplayForm] = useState(false);
  const [message, setMessage] = useState('');
  const onSubmit = (e)=>{
    e.preventDefault();
    onCollaborationDemandSent(message);
    setMessage('');
  };
  const disabled = message.length===0;
  return (
    <div className="offer-element__collaborate-container">
      <button
        onClick={()=>setDisplayForm(!displayForm)}
        className="offer-element__collaborate-button"
      >Répondre à cette annonce</button>
      {displayForm &&
        <form
          onSubmit={onSubmit}
          className="offer-element__comment-form offer-element__collaboration-form"
        >
          <textarea
            placeholder="Expliquez rapidement ce qui vous intéresse dans cette annonce..."
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
            className="offer-element__comment-text"
          ></textarea>
          <button disabled={disabled} className="offer-element__comment-button">Envoyer</button>
        </form>
      }
    </div>
  );
};