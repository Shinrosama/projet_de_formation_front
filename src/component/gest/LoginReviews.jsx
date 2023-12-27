import React, { useState } from 'react';

import './LoginReviews'

const LoginReviews = () => {
    const [comments, setComments] = useState([
        { id: 1, text: 'Premier commentaire' },
        { id: 2, text: 'Un autre commentaire' },
        { id: 3, text: 'Encore un commentaire' },
      ]);
    
      const [newComment, setNewComment] = useState(''); 
    
      const handlePostComment = () => {
        if (newComment.trim() !== '') {
          setComments((prevComments) => [...prevComments, { id: prevComments.length + 1, text: newComment }]);
          // vide le champ qui permet de poster un nouveau commentaire
          setNewComment(''); 
        }
      };
    
      const handleUpdateComment = (id, updatedText) => {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === id ? { ...comment, text: updatedText } : comment
          )
        );
      };
    
      const handleDeleteComment = (id) => {
        setComments((prevComments) => prevComments.filter((comment) => comment.id !== id));
      };
    
      return (
        <div>
          <h2>Section Commentaires</h2>
          <div>
            {comments.map((comment) => (
              <div key={comment.id}>
                <p>{comment.text}</p>
                <button onClick={() => handleUpdateComment(comment.id, prompt('Modifier le commentaire', comment.text))}>
                  Modifier
                </button>
                <button onClick={() => handleDeleteComment(comment.id)}>Supprimer</button>
              </div>
            ))}
          </div>
          <div>
            <h3>Ajouter un commentaire</h3>
            <textarea
              placeholder="Ajouter un commentaire..."
              value={newComment} 
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={handlePostComment}>Poster</button>
          </div>
        </div>
      );
    };

export default LoginReviews;


