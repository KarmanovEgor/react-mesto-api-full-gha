import { useContext } from "react";
import Card from "../Card/Card";
import currentUserContext from "../../contexts/CurrentUserContext";
import Register from "../Register/Register";
import Login from "../Login/Login";

export default function Main({
  oneEditProfile,
  onEditAvatar,
  onAddPlace,
  onClickCard,
  onDelete,
  cards,
  onCardLike,
  name,
  handleLogin,
  handleRegister
}) {
  const currentUser = useContext(currentUserContext);

  return (
    <main className="content">
      {name === "content" ? (
        <>
          <section className="profile page__profile">
            <div className="profile__ava-container">
              <img
                className="profile__img"
                title="изображение профиля"
                alt="изображение профиля"
                src={currentUser.currentUser.avatar ? currentUser.currentUser.avatar : "#"}
              />
              <button
                type="button"
                className="profile__button-ava"
                onClick={onEditAvatar}
              />
            </div>
            <div className="profile__info">
              <h1 className="profile__title">
                {currentUser.currentUser.name ? currentUser.currentUser.name : ""}
              </h1>
              <button
                type="button"
                className="profile__button-edit"
                onClick={oneEditProfile}
              />
              <p className="profile__subtitle">
                {currentUser.currentUser.about ? currentUser.currentUser.about : ""}
              </p>
            </div>
            <button
              type="button"
              className="profile__button-add"
              onClick={onAddPlace}
            />
          </section>
          <section className="element">
            {cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onClickCard={onClickCard}
                onDelete={onDelete}
                onCardLike={onCardLike}
              />
            ))}
          </section>
        </>
      ) : name === "signup" ? (
        <Register name={name} handleRegister={handleRegister} />
      ) : (
        <Login name={name} handleLogin={handleLogin} />
      )}
    </main>
  );
}
