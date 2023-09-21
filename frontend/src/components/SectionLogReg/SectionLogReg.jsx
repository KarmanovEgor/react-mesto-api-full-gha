import Form from "../Form/Form";
// import "../../blocks/login/login.css";
import { Link } from "react-router-dom";

export default function SectionLogReg({ name, children, isValid, onSubmit }) {
 
  return (
    
    <section className="login">
      <h2 className="login__header">
        {name === "signup" ? "Регистрация" : "Вход"}
      </h2>
      <Form
        name={name}
        btnTitle={name === "signup" ? "Регистрация" : "Войти"}
        children={children}
        isValid={isValid}
        onSubmit={onSubmit}
      />
      {name === "signup" && 
        <p className="login__help">
          Уже зарегистрированы?
          <Link to={"/signin"} className="login__help-link" >
            Войти
          </Link>
        </p>
      }
    </section>
  
  );
}
