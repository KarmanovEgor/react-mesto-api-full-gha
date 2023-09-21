
import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopapWithForm/PopupWithForm";
import Input from "../Input/Input";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const { values, errors, isInputValid, isValid, handleChange, reset } =
    useFormValidation();
  function resetOfClose() {
    onClose();
    reset();
  }
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({ avatar: values.avatar }, reset);
  }
  return (
    <PopupWithForm
      name="avatar-edit"
      title="Обновить аватар"
      btnTitle="Обновить"
      isOpen={isOpen}
      onClose={resetOfClose}
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__elements">
        <Input
          name="avatar"
          type="url"
          placeholder="Ссылка на картинку"
          value={values.avatar}
          onChange={handleChange}
          error={errors.avatar}
          isInputValid={isInputValid.avatar}
        />
      </fieldset>
    </PopupWithForm>
  );
}