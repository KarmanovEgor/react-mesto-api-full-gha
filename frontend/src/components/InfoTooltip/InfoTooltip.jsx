import Popup from "../Popup/Popup";

export default function InfoTooltip({ name, isSuccessful, isOpen, onClose}) {
 
  return (

    <Popup name={name} isOpen={isOpen} onClose={onClose}>
      <div className={`popup__info-icon ${!isSuccessful ? 'popup__info-icon-fals' : ''}`}></div>
      <p className="popup__info-text">{isSuccessful ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз'}</p>
     
    </Popup>
  );
}
