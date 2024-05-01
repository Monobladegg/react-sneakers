import React from "react";
import ContentLoader from "react-content-loader";
import styles from "./Card.module.scss";
import AppContext from "../../context";

function Card({
  id,
  parentId,
  title,
  image,
  price,
  onFavorite,
  onPlus,
  favorited = false,
  added = false,
  loading = false,
}) {
  const { isItemAdded } = React.useContext(AppContext);
  const [isAdded, setIsAdded] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(favorited);

  const obj = { id, parentId: id, title, image, price };

  console.log(id, title);

  const onClickPlus = () => {
    onPlus(obj);
    setIsAdded(!isAdded);
  };

  const onClickFavorite = () => {
    onFavorite(obj);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={165}
          height={250}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="155" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="0" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="10" ry="10" width="35" height="35" />
        </ContentLoader>
      ) : (
        <>
          <div className={styles.favorite}>
            {onFavorite && (
              <img
                onClick={onClickFavorite}
                src={isFavorite ? "/img/liked.svg" : "/img/heart-unliked.svg"}
                alt="unliked"
              />
            )}
          </div>
          <img width="100%" height={130} src={image} alt="Sneakers" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} грн.</b>
            </div>
            {onPlus && (
              <img
                alt="Plus"
                onClick={onClickPlus}
                className={styles.plus}
                src={
                  isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"
                }
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
