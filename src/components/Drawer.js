import React from "react";
import Info from "./info/Info";
import AppContext from "../context";

import axios from 'axios'

const delay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
 
export default function Drawer({ onClose, onRemove, items = [] }) {

  const { cartItems, setCartItems } = React.useContext(AppContext);
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderConmplete, setIsOrderConmplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post("https://662810af54afcabd0734c77d.mockapi.io/orders", {
        items: cartItems,
      });
      setOrderId(data.id);
      setIsOrderConmplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(`https://662810af54afcabd0734c77d.mockapi.io/cart/${item.id}`);
        await delay(1000);
      }

    } catch (error) {
      alert("Ошибка при создании заказа :(");
    }
    setIsLoading(false);
  }

  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="mb-30 d-flex justify-between">
          Корзина
          <img
            className="removeBtn cu-p"
            src="/img/btn-remove.svg"
            alt="Remove"
            onClick={onClose}
          />
        </h2>

        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items">
              {items.map((obj) => (
                <div
                  key={obj.id}
                  className="cartItem d-flex align-center mb-20"
                >
                  <div
                    style={{ backgroundImage: `url(${obj.image})` }}
                    className="cartItemImg"
                  ></div>

                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} грн.</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="removeBtn"
                    src="/img/btn-remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul className="cartTotalBlock">
                <li className="d-flex align-center justify-between mb-20">
                  <span>Итого:</span>
                  <div></div>
                  <b>21 498 грн.</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>21 498 грн.</b>
                </li>
              </ul>
              <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
                Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderConmplete ? "Заказ оформлен!" : "Корзина пуста"}
            description={isOrderConmplete ? "Ваш заказ #18 скоро будет передан курьерской доставк" : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
            image={isOrderConmplete ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"}
          />
        )}
      </div>
    </div>
  );
}