import { useState } from "react";
import { Link } from "react-router-dom";
import './Burger.css'

const Burger = ({ dataUser, onLogout }) => {
  const [activeBurger, setActiveBurger] = useState(false);

  function handleClickBurger() {
    setActiveBurger(!activeBurger);
  }

  return (
    <div className="header__blocks">
      <ul
        className={`header__block ${
          activeBurger ? "header__block-active" : ""
        }`}
      >
        <li className="header__block-email">{dataUser}</li>
        <li className="header__block-link">
          <Link
            to="/signin"
            className="header__login-link-out"
            onClick={onLogout}
          >
            Выйти
          </Link>
        </li>
      </ul>

      <button
        onClick={handleClickBurger}
        className={`burger header__button${
          activeBurger ? " burger_active" : ""
        }`}
      >
        <div
          className={`burger-line ${activeBurger ? " burger-first-line" : ""}`}
        ></div>
        <div
          className={`burger-line ${activeBurger ? " burger-second-line" : ""}`}
        ></div>
        <div
          className={`burger-line ${activeBurger ? " burger-third-line" : ""}`}
        ></div>
      </button>
    </div>
  );
};

export default Burger;
