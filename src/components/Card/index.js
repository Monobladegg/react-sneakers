import React from "react";
import styles from "./Card.module.scss";

console.log(styles);

function Card(props) {
  const [isAdded, setIsAdded] = React.useState(false);
  const onClickPlus = () => {
    setIsAdded(!isAdded);
  }

  React.useEffect(() => {
    console.log(isAdded)
  }, [isAdded])
  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={props.onClickfavorite}>
        <img src="/img/heart-unliked.svg" alt="unliked" />
      </div>
      <img width={133} height={112} src={props.imageUrl} alt="Sneakers" />
      <h5>{props.title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{props.price} грн.</b>
        </div>
        <img alt="Plus" onClick={onClickPlus} className={styles.plus} src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} />
      </div>
    </div>
  );
}

export default Card;
