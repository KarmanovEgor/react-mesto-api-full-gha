import { useCallback, useState } from "react";

export default function useFormValidation(initialState = {profilename: '', job: ''}) {
  const [values, setValues] = useState(initialState);
  const [errors, setError] = useState({});
  const [isInputValid, setIsInputValid] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(evt) {
    const name = evt.target.name;
    const value = evt.target.value;
    const validationMessage = evt.target.validationMessage;
    const valid = evt.target.validity.valid;
    const form = evt.target.form;

    setValues((firstValues) => {
      return { ...firstValues, [name]: value };
    });
    setError((firsError) => {
      return { ...firsError, [name]: validationMessage };
    });
    
    setIsInputValid((firstInputValid) => {
      return { ...firstInputValid, [name]: valid };
    });
    setIsValid(form.checkValidity());
  }
  function reset(obj = initialState) {
    setValues(obj);
    setError({});
    setIsInputValid({});
    setIsValid(false);
  }
  const setInitialData = useCallback((name, value) => {
    setValues((firstValues) => {
      return { ...firstValues, [name]: value };
    });
  }, []);

  return {
    values,
    errors,
    isInputValid,
    isValid,
    handleChange,
    reset,
    setInitialData,
  };
}
