import React from "react";
import Card from "../components/Card";
import AppContext from "../context";
import axios from "axios";

function Orders() {
  const { onAddToCart, onAddToFavorites } = React.useContext(AppContext);
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          "https://662810af54afcabd0734c77d.mockapi.io/orders"
        );
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (e) {
        alert("Ошибка при запросе данных о заказах");
        console.error(e);
      }
    }

    fetchData();
  }, [])

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои заказы</h1>
      </div>
      <div className="d-flex flex-wrap">
        {orders
          .map((item, index) => (
            <Card
              key={index}
              onFavorite={(obj) => onAddToFavorites(obj)}
              loading={false}
              {...item}
            />
          ))}
      </div>
    </div>
  );
}

export default Orders;
