import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

export default function Profile({
  clothingItems,
  onCardClick,
  handleAddClick,
  onCardLike,
  handleLogout,
  handleEditProfileClick,
}) {
  return (
    <section className="profile">
      <SideBar
        handleLogout={handleLogout}
        handleEditProfileClick={handleEditProfileClick}
      />
      <ClothesSection
        onCardClick={onCardClick}
        clothingItems={clothingItems}
        handleAddClick={handleAddClick}
        onCardLike={onCardLike}
      />
    </section>
  );
}
