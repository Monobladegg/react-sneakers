import React from "react";

const SneakerCard = ({ title, price, imgSrc }) => {
  const formatPrice = (price) => {
    // 12999 -> 12 999
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };
  return (
    <div className="card">
      <img width={133} height={112} src={imgSrc} alt="Sneakers" />
      <h5>{title}</h5>
      <div className="d-flex justify-between">
        <div className="d-flex flex-column align-center">
          <span>Цена:</span>
          <b>{formatPrice(price)} руб.</b>
        </div>
        <button className="button">
          <img width={11} height={11} src="/img/plus.svg" alt="Plus" />
        </button>
      </div>
    </div>
  );
};

export default SneakerCard;
