import React from "react";
import styles from "./Card.module.scss";

console.log(styles);

function Card({ title, imageUrl, price, onfavorite, onPlus }) {
  const [isAdded, setIsAdded] = React.useState(false);
  const onClickPlus = () => {
    onPlus({ title, imageUrl, price });
    setIsAdded(!isAdded);
  }

  // React.useEffect(() => {
  //   console.log(isAdded)
  // }, [isAdded])

  const [isfavorite, setisfavorite] = React.useState(false);
  const onClickFavorite = () => {
    setisfavorite(!isfavorite);
  }

  // React.useEffect(() => {
  //   console.log(isfavorite)
  // }, [isfavorite])

  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={onfavorite}>
        <img onClick={onClickFavorite} src={isfavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"} alt="unliked" />
      </div>
      <img width={133} height={112} src={imageUrl} alt="Sneakers" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price} грн.</b>
        </div>
        <img alt="Plus" onClick={onClickPlus} className={styles.plus} src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} />
      </div>
    </div>
  );
}

export default Card;
