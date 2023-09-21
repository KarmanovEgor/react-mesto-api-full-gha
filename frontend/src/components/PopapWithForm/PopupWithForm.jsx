import Popup from "../Popup/Popup";
import Form from "../Form/Form";

export default function PopupWithForm({
  name,
  title,
  btnTitle,
  children,
  isOpen,
  onClose,
  onSubmit,
  isValid = true,
}) {
  return (
    <Popup name={name} isOpen={isOpen} onClose={onClose}>
      <h2
        className={`popup__title ${
          name === "delete" && "popup__container_del"
        }`}
      >
        {title}
      </h2>

      <Form
        name={name}
        btnTitle={btnTitle}
        children={children}
        isValid={isValid}
        onSubmit={onSubmit}
      >
        {children}
      </Form>
    </Popup>
  );
}
