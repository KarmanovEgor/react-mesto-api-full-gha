import { useContext } from "react";
import currentUserContext from "../../contexts/CurrentUserContext";

export default function Card({ card, onClickCard, onDelete, onCardLike }) {

  const currentUser = useContext(currentUserContext);
  const isLiked = card.likes.some((i) => i === currentUser.currentUser._id);

  return (
    <div className="element__card">
      {currentUser.currentUser._id === card.owner && (
        <button
          className="element__trash-btn"
          type="button"
          onClick={() => onDelete(card._id)}
         
        />
        
      )}

      <img
        className="element__foto"
        alt={card.name}
        src={card.link}
        onClick={() => onClickCard({ link: card.link, name: card.name })}
      />
      <div className="element__names">
        <h2 className="element__name">{card.name}</h2>
        <div className="element__like-container">
          <button
            className={`element__like-btn ${
              isLiked ? "element__like-btn_active" : ""
            }`}
            type="button"
            title="Оценить фотографию"
            aria-label="Поставить лайк"
            onClick={() => onCardLike(card)}
            likes={card.likes}
            myid={currentUser.currentUser._id}
          ></button>
          <span className="element__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}
