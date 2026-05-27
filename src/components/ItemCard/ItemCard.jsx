import { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import heartEmpty from "../../assets/liked_default.svg";
import heartFilled from "../../assets/liked.svg";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isCurrentlyLiked = item.likes?.some((id) => id === currentUser?._id);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = (e) => {
    e.stopPropagation();

    onCardLike({ id: item._id, isLiked: isCurrentlyLiked });
  };

  //const isLiked = item.likes.some((id) => id === currentUser._id);

  // const itemLikeButtonClassName = `card__like-btn ${
  //   isLiked ? "card__like-btn_active" : ""
  // }`;

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>

        {currentUser._id && (
          <button
            type="button"
            className="card__like-btn"
            onClick={handleLike}
            aria-label={isCurrentlyLiked ? "Unlike item" : "Like item"}
          >
            <img
              src={isCurrentlyLiked ? heartFilled : heartEmpty}
              alt={isCurrentlyLiked ? "liked icon" : "like icon"}
              className="card__like_icon"
            />
          </button>
        )}
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
