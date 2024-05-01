import React from "react";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import Header from "./components/Header";
import Drawer from "./components/drawer/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";
import Orders from "./pages/Orders";

export default function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

  React.useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        const [itemsResponse, cartResponse, favoritesResponse] = await Promise.all([
          axios.get("https://662398043e17a3ac846fa3bf.mockapi.io/items"),
          axios.get("https://662398043e17a3ac846fa3bf.mockapi.io/cart"),
          axios.get("https://662810af54afcabd0734c77d.mockapi.io/favorites"),
        ])

        setIsLoading(false);
        setItems(itemsResponse.data);
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
      } catch (e) {
        alert("Ошибка при запросе данных ;(");
        console.error(e);
      }
    }
    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    console.log(obj);
    const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
    try {
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        );
        await axios.delete(
          `https://662398043e17a3ac846fa3bf.mockapi.io/cart/${findItem.id}`
        );
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post("https://662398043e17a3ac846fa3bf.mockapi.io/cart", obj);
        setCartItems((prev) => prev.map((item) => {
          if (item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id
            }
          }
          return item
        }));
      }
    } catch (error) {
      console.error(alert("Не удалось добавить в корзину"));
    }
  };

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://662398043e17a3ac846fa3bf.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    } catch (error) {
      alert("Не удалось удалить из корзины");
    }
  };

  const onAddToFavorites = async (item) => {
    try {
      if (favorites.find((favItem) => Number(favItem.id) === Number(item.id))) {
        axios.delete(
          `https://662810af54afcabd0734c77d.mockapi.io/favorites/${item.id}`
        );
        setFavorites((prev) =>
          prev.filter((item) => Number(item.id) !== item.id)
        );
      } else {
        const { data } = await axios.post(
          "https://662810af54afcabd0734c77d.mockapi.io/favorites",
          item
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в Фавориты");
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  function clearSearchInput() {
    setSearchValue("");
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddToFavorites,
        setCartOpened,
        setCartItems,
        totalPrice,
      }}
    >
      <div className="wrapper clear">
        <div>
          <Drawer
            items={cartItems}
            onClose={() => setCartOpened(false)}
            onRemove={onRemoveItem}
            opened={cartOpened}
          />
        </div>
        <Header onClickCart={() => setCartOpened(true)} />
        <Route path="/" exact>
          <Home
            items={items}
            cartItems={cartItems}
            searchValue={searchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToFavorites={onAddToFavorites}
            onAddToCart={onAddToCart}
            clearSearchInput={clearSearchInput}
            isLoading={isLoading}
          />
        </Route>
        <Route path="/favorites/" exact>
          <Favorites />
        </Route>
        <Route path="/orders/" exact>
          <Orders />
        </Route>
      </div>
    </AppContext.Provider>
  );
}
