import { useContext, useEffect } from "react";
import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopapWithForm/PopupWithForm";
import currentUserContext from "../../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  
  const currentUser = useContext(currentUserContext);
  const {
    values,
    errors,
    isInputValid,
    isValid,
    handleChange,
    reset,
    setInitialData,
  } = useFormValidation({profilename: '', job: '' }

);

  useEffect(() => {
    setInitialData("profilename", currentUser.currentUser.name || '');
    setInitialData("job", currentUser.currentUser.about || '');
  }, [currentUser, setInitialData]);
  // console.log(currentUser)
  function resetOfClose() {
    onClose();
    reset({ profilename: currentUser.currentUser.name, job: currentUser.currentUser.about});
  }
  // console.log(values)
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({ profilename: values.profilename, job: values.job }, reset);
  }

  return (
    <PopupWithForm
      name="profile-edit"
      title="Редактировать профиль"
      btnTitle="Сохранить"
      isOpen={isOpen}
      onClose={resetOfClose}
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      {" "}
      <fieldset className="popup__elements">
        <input
          className={`popup__element ${
            isInputValid.profilename === undefined || isInputValid.profilename
              ? ""
              : "popup__element_invalid"
          }`}
          type="text"
          name="profilename"
          id="name"
          placeholder="Имя"
          minLength={2}
          maxLength={40}
          required
          value={values.profilename}
          onChange={handleChange}
         
        />
        <span className="popup__error popup__error_type_profilename">
          {errors.profilename}
        </span>
        <input
          className={`popup__element ${
            isInputValid.job === undefined || isInputValid.job
              ? ""
              : "popup__element_invalid"
          }`}
          type="text"
          name="job"
          id="job"
          placeholder="Вид деятельности"
          minLength={2}
          maxLength={200}
          required
          value={values.job}
          onChange={handleChange}
   
        />
        <span className="popup__error popup__error_type_job">{errors.job}</span>
      </fieldset>
    </PopupWithForm>
  );
}
  //  value={values.job ? values.job : ''}
  //  value={values.profilename ? values.profilename : ''}