
import Input from "../Input/Input";
import SectionLogReg from "../SectionLogReg/SectionLogReg";
import useFormValidation from "../../utils/useFormValidation";

export default function Login({ name, handleLogin }) {
  const { values, errors, isInputValid, isValid, handleChange } =
    useFormValidation();

  function onLogin(e) {
    e.preventDefault();
    handleLogin(values.password, values.email);
  }
  return (
    <SectionLogReg name={name} onSubmit={onLogin} isValid={isValid}>
      <Input
        name="email"
        type="email"
        placeholder={"Email"}
        value={values.email}
        onChange={handleChange}
        isInputValid={isInputValid.email}
        error={errors.email}
      />
      <Input
        name="password"
        type="password"
        placeholder={"пароль"}
        value={values.password}
        onChange={handleChange}
        isInputValid={isInputValid.password}
        error={errors.password}
      />
    </SectionLogReg>
  );
}

//   return (
//     <section className="login">
//       <h2 className="login__header">Вход</h2>
//       <form className="login__form" onSubmit={handleSubmit}>
//         <input className="login__input" type="email" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange}/>
//         <input className="login__input" type="password" id="password" name="password" placeholder="Пароль" value={formData.password} onChange={handleInputChange}/>
//         <div className="login__footer">
//           <button className="login__button" type="submit">Войти</button>
//         </div>
//       </form>
//     </section>
//   );
// };

// export default Login;
