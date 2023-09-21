import useFormValidation from "../../utils/useFormValidation";
import Input from "../Input/Input";
import PopupWithForm from "../PopapWithForm/PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const { values, errors, isInputValid, isValid, handleChange, reset } =
    useFormValidation();

  function resetOfClose() {
    onClose();
    reset();
  } 
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ title: values.title, link: values.link }, reset);
  }
  return (
    <PopupWithForm
      name="add-Card"
      title="Новое место"
      btnTitle="Добавить"
      isOpen={isOpen}
      onClose={resetOfClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <Input
        name="title"
        type="text"
        id="title"
        placeholder="Название"
        minLength={2}
        maxLength={30}
        required
        value={values.title}
        onChange={handleChange}
        error={errors.title}
        isInputValid={isInputValid.title}
      />

      <Input
        type="url"
        name="link"
        id="link"
        placeholder="Ссылка на картинку"
        required
        value={values.link}
        onChange={handleChange}
        error={errors.link}
        isInputValid={isInputValid.link}
      />

      {/* <fieldset className="popup__elements">
        <input
          className={`popup__element ${
            isInputValid.title === undefined || isInputValid.title
              ? ""
              : "popup__element_invalid"
          }`}
          type="text"
          name="title"
          id="title"
          placeholder="Название"
          minLength={2}
          maxLength={30}
          required
          value={values.title}
          onChange={handleChange}
        />
        <span className="popup__error popup__error_type_title">
          {errors.title}
        </span>
        <input
          className={`popup__element ${
            isInputValid.link === undefined || isInputValid.link
              ? ""
              : "popup__element_invalid"
          }`}
          type="url"
          name="link"
          id="link"
          placeholder="Ссылка на картинку"
          required
          value={values.link}
          onChange={handleChange}
        />
        <span className="popup__error popup__error_type_link">
          {errors.link}
        </span>
      </fieldset> */}
    </PopupWithForm>
  );
}
