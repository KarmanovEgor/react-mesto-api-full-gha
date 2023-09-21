import { useState } from "react";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import Burger from "../Burger/Burger";

export default function Header({ name, dataUser }) {
  
  function onLogout() {
    localStorage.removeItem("jwt");
  }
  const [activeBurger, setActiveBurger] = useState(false);

  function handleClickBurger() {
    setActiveBurger(!activeBurger);
  }

  return (
    <header className={`header ${activeBurger ? 'header_active' : ''}`}>
      <img
        className="header__logo"
        title="логотип локация"
        alt="логотип локация"
        src={logo}
      />

      {name === "signup" || name === "signin" ? (
        <Link
          to={name === "signup" ? "/signin" : "/signup"}
          className="header__login-link"
        >
          {name === "signup" ? "Вход" : "Регистрация"}
        </Link>
      ) : (
        <>
          <Burger dataUser={dataUser} onLogout={onLogout} activeBurger={activeBurger} handleClickBurger={handleClickBurger} />
        </>
      )}
    </header>
  );
}
