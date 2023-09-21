export default function ImagePopup({ card, isOpen, onClose }) {
 
  return (
    <div className={`popup popup_img-form ${isOpen && " popup_opened"}`} onClick={onClose}>
      <div className="popup__gallery" onClick={(event)=> event.stopPropagation()}>
        <button
          className="popup__close"
          type="button"
          title="Закрыть окно"
          aria-label="Закрыть"
          onClick={onClose}
        />
        <figure className="popup__figure-img">
          <img className="popup__image" src={card.link} alt={card.name} />
          <figcaption className="popup__figurecaption-img">
            {card.name}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
