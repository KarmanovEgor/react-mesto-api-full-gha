
export default function Form({name, btnTitle, children, isValid, onSubmit}) {
  return (
    <form noValidate name={name} onSubmit={onSubmit} className="popup__form">
      {children}
      {name === "signin" || name === "signup" ? (
        <button
          className={`login__button ${isValid ? "" : "login__button_disabled"}`}
        >
         
          {btnTitle || 'Сохранить' }
        </button>
      ) : (
        <button
          className={`popup__btn ${isValid ? "" : "popup__btn_disabled"}`}
          type="submit"
        >
          {btnTitle || 'Сохранить'}
        </button>
      )}
    </form>
  );
}

