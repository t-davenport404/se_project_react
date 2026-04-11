import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

export default function ClothesSection({
  clothingItems,
  onCardClick,
  handleAddClick,
}) {
  return (
    <div className="clothes__section">
      <div className="clothes__section__row">
        <p className="clothes_section__text">Your Items</p>
        <button className="clothes__section__add_btn" onClick={handleAddClick}>
          + Add New
        </button>
      </div>
      <ul className="clothes__section__items">
        {clothingItems.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </div>
  );
}
