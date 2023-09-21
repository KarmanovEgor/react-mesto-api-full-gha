// import useFormValidation from "../../utils/useFormValidation";

export default function Input({
  name,
  type,
  placeholder,
  minLength,
  maxLength,
  isInputValid,
  value,
  onChange,
  error,
}) {
  // const { values, errors, isInputValid, isValid} =
  // useFormValidation();
  return (
    <>
      {name === "password" || name === "email" ? (
        <>
          <input
            name={name}
            type={type}
            placeholder={placeholder}
            minLength={minLength ? minLength : ""}
            maxLength={maxLength ? maxLength : ""}
            required
            value={value ? value : ""}
            onChange={onChange}
            className={`login__input ${
              isInputValid === undefined || isInputValid
                ? ""
                : "login__input_invalid"
            }`}
          />
          <span className={"login__error"}>{error}</span>
        </>
      ) : (
        <>
          <input
            name={name}
            type={type}
            placeholder={placeholder}
            minLength={minLength ? minLength : ""}
            maxLength={maxLength ? maxLength : ""}
            required
            value={value ? value : ""}
            onChange={onChange}
            className={`popup__element ${
              isInputValid === undefined || isInputValid
                ? ""
                : "popup__input_invalid"
            }`}
          />
          <span className={"popup__error"}>{error}</span>
        </>
      )}
    </>
  );
}
