import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import "./App.css";
import { coordinates, apikey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import {
  addItem,
  getItems,
  removeItem,
  addCardLike,
  removeCardLike,
  updateProfile,
} from "../../utils/api";
import * as auth from "../../utils/auth";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    avatar: "",
    _id: "",
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    auth
      .register(name, avatar, email, password)
      .then(() => {
        handleLogin({ email, password });
      })
      .catch(console.error);
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) return;

    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);

          auth
            .checkToken(data.token)
            .then((userData) => {
              setCurrentUser(userData);
              setIsLoggedIn(true);
              closeActiveModal();
            })
            .catch(console.error);
        }
      })
      .catch(console.error);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({ name: "", avatar: "", _id: "" });
  };

  const onAddItem = (inputValues) => {
    const jwt = localStorage.getItem("jwt");
    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weather,
    };

    addItem(newCardData, jwt)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleDeleteClick = (cardId) => {
    setSelectedCard(cardId);
    setActiveModal("confirm-delete");
  };

  function handleDeleteItem(itemId) {
    const jwt = localStorage.getItem("jwt");

    removeItem(itemId, jwt)
      .then(() => {
        setClothingItems((prev) => prev.filter((item) => item._id !== itemId));
        closeActiveModal();
      })
      .catch(console.error);
  }

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    if (!isLiked) {
      addCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item)),
          );
        })
        .catch(console.error);
    } else {
      removeCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item)),
          );
        })
        .catch(console.error);
    }
  };

  const handleUpdateUser = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    if (!name || !avatar) return;

    updateProfile({ name, avatar }, token)
      .then((updatedUserData) => {
        setCurrentUser(updatedUserData);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    const loadWeather = (coords) => {
      getWeather(coords, apikey)
        .then((data) => {
          const filteredData = filterWeatherData(data);
          setWeatherData(filteredData);
        })
        .catch(console.error);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          loadWeather({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
        },
        (error) => {
          console.warn(
            "Geolocation unavailable, using default weather location:",
            error,
          );
          loadWeather(coordinates);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        },
      );
    } else {
      loadWeather(coordinates);
    }

    getItems()
      .then((data) => {
        if (Array.isArray(data)) {
          setClothingItems([...data].reverse());
        }
      })
      .catch((err) => {
        console.error("Error fetching items:", err);
      });
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error("Token validation failed:", err);
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              handleLoginClick={() => setActiveModal("login")}
              handleSignUpClick={() => setActiveModal("registration")}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      handleLogout={handleLogout}
                      onCardLike={handleCardLike}
                      handleEditProfileClick={() =>
                        setActiveModal("edit-profile")
                      }
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />

            <RegisterModal
              isOpen={activeModal === "registration"}
              handleRegister={handleRegister}
              onClose={closeActiveModal}
            />

            <LoginModal
              isOpen={activeModal === "login"}
              handleLogin={handleLogin}
              onClose={closeActiveModal}
            />

            <EditProfileModal
              isOpen={activeModal === "edit-profile"}
              onClose={closeActiveModal}
              handleUpdateUser={handleUpdateUser}
            />

            <AddItemModal
              isOpen={activeModal === "add-garment"}
              onAddItem={onAddItem}
              onClose={closeActiveModal}
            />
            <ItemModal
              isOpen={activeModal === "preview"}
              card={selectedCard}
              onDeleteItem={handleDeleteClick}
              onClose={closeActiveModal}
            />

            <ConfirmDeleteModal
              isOpen={activeModal === "confirm-delete"}
              onClose={closeActiveModal}
              onConfirm={() => handleDeleteItem(selectedCard)}
            />
          </div>
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
