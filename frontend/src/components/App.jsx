// комментарии к работе : 1)реализовал дополнительные компоненты, а так же попробовал подключить отдельно стили в компоненте Burger(как я понял данный компонент не обязателен)
// 2) Валидация так же была не обязательна в этой работе, поэтому я её немного не доделал (сроки поджимают, но в консоли ошибок нет)
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import PopupWithForm from "./PopapWithForm/PopupWithForm";
import ImagePopup from "./ImagePopup/ImagePopup";
import { useCallback, useState, useEffect } from "react";
import currentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import InfoTooltip from "./InfoTooltip/InfoTooltip";
import * as auth from "../utils/auth.js";
import { Navigate, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { register, authorize, getContent } from "../utils/auth.js";
import ProtectedMain from "./ProtectedMain/ProtectedMain";

function App() {
  const navigate = useNavigate();
  // Popup
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isDelPopupOpen, setDelPopupOpen] = useState(false);
  // Context
  const [currentUser, setCurrentUser] = useState({});
  // Card
  const [cards, setCards] = useState([]);
  // удаление карточки
  const [deleteCardId, setDeleteCardId] = useState("");
  const isOpen =
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isEditAvatarPopupOpen ||
    isImagePopupOpen ||
    isDelPopupOpen ||
    isInfoTooltipPopupOpen;
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);
  const closeAllPopups = useCallback(() => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setDelPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
  }, [
    setIsEditProfilePopupOpen,
    setIsAddPlacePopupOpen,
    setIsEditAvatarPopupOpen,
    setIsImagePopupOpen,
    setDelPopupOpen,
    setIsInfoTooltipPopupOpen,
  ]);

  useEffect(() => {
    if (localStorage.jwt) {
      getContent(localStorage.jwt)
        .then(res => {
          setUserEmail(res.email)
          setLoggedIn(true)
          navigate('/')
        })
        .catch(err => console.log(`Ошибкак авторизации при повторном входе ${err}`))
    } else {
      setLoggedIn(false)
    }
  }, [navigate])

  useEffect(() => {
    if (!isOpen) return;

    function handleESC(e) {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    }

    document.addEventListener("keydown", handleESC);

    return () => document.removeEventListener("keydown", handleESC);
  }, [isOpen, closeAllPopups]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleDelPopupClick(cardid) {
    setDeleteCardId(cardid);
    setDelPopupOpen(true);
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    // console.log(currentUser)

    if (!isLiked) {
      api
        .addLike(card._id, localStorage.jwt)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(`Ошибка при добавлении лайка: ${err}`);
        });
    } else {
      api
        .deleteLike(card._id, localStorage.jwt)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(`Ошибка при удалении лайка: ${err}`);
        });
    }
  }

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getInfo(localStorage.jwt), api.getCards(localStorage.jwt)])

        .then(([resInfo, resCards]) => {
          setCurrentUser(resInfo);
          setCards(resCards);
        })
        .catch((error) =>
          console.error(`Ошибка при загрузке информации:${error}`)
        );
    }
  }, [loggedIn]);

  function handleSubmit(e) {
    e.preventDefault();
    api
      .deleteCard(deleteCardId, localStorage.jwt)
      .then(() => {
        setCards(
          cards.filter((el) => {
            return el._id !== deleteCardId;
          })
        );
        closeAllPopups();
      })
      .catch((error) =>
        console.error(`Ошибка при удалении карточки: ${error}`)
      );
  }

  function handleUpdateUser(dataUser, reset) {
    api
      .setUserInfo(dataUser, localStorage.jwt)
      .then((el) => {
        setCurrentUser(el);
        closeAllPopups();
        reset();
      })
      .catch((error) =>
        console.error(
          `Ошибка при обновлении информации о пользователе: ${error}`
        )
      );
  }

  function handleUpdateAvatar(dataUser, reset) {
    api
      .setUserAva(dataUser, localStorage.jwt)
      .then((el) => {
        setCurrentUser(el);
        closeAllPopups();
        reset();
      })
      .catch((error) =>
        console.error(`Ошибка при обновлении аватара пользователя: ${error}`)
      );
  }

  function handleAddPlaceSubmit(dataCard, reset) {
    api
      .addCard(dataCard, localStorage.jwt)
      .then((el) => {
        setCards([el, ...cards]);
        closeAllPopups();
        reset();
      })
      .catch((error) =>
        console.error(`Ошибка  при добавлении карточки: ${error}`)
      );
  }

  function handleRegister(password, email) {
    register(password, email)
      .then((response) => {
        setIsInfoTooltipPopupOpen(true);
        setIsSuccessful(true);
        navigate("/signin");
      })
      .catch((error) => {
        setIsInfoTooltipPopupOpen(true);
        setIsSuccessful(false);
        console.error(`Ошибка при регистрации: ${error}`);
      });
  }
  function handleLogin(password, email) {
    authorize(password, email)
      .then((res) => {
        setLoggedIn(true);
        localStorage.setItem("jwt", res.token);
        navigate("/");
      })
      .catch((error) => {
        setIsInfoTooltipPopupOpen(true);
        setIsSuccessful(false);
        console.error(`Ошибка при авторизации: ${error}`);
      });
  }

  return (
    <currentUserContext.Provider value={{ currentUser, userEmail, loggedIn }}>
      <div className="page__content">
        <Routes>
          <Route
            path="/*"
            element={
              <ProtectedRoute
                element={ProtectedMain}
                oneEditProfile={handleEditProfileClick}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                onClickCard={handleCardClick}
                onDelete={handleDelPopupClick}
                cards={cards}
                onCardLike={handleCardLike}
                userEmail={userEmail}
                loggedIn={loggedIn}
                replace={true}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <Header name="signup" />
                <Main name="signup" handleRegister={handleRegister} />
              </>
            }
          />
          <Route
            path="/signin"
            element={
              <>
                <Header name="signin" />
                <Main name="signin" handleLogin={handleLogin} />
              </>
            }
          />
          <Route path="/*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        ></EditProfilePopup>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <PopupWithForm
          name="delete"
          title="Вы уверены?"
          btnTitle="Да"
          isOpen={isDelPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleSubmit}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          name="result"
          isSuccessful={isSuccessful}
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </currentUserContext.Provider>
  );
}
export default App;
