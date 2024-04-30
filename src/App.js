import React from "react";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";

export default function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      const itemsResponse = await axios.get(
        "https://662398043e17a3ac846fa3bf.mockapi.io/items"
      );
      const cartResponse = await axios.get(
        "https://662398043e17a3ac846fa3bf.mockapi.io/cart"
      );
      const favoritesResponse = await axios.get(
        "https://662810af54afcabd0734c77d.mockapi.io/favorites"
      );

      setIsLoading(false);

      setItems(itemsResponse.data);
      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
    }

    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    console.log(obj);
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        axios.delete(
          `https://662398043e17a3ac846fa3bf.mockapi.io/cart/${obj.id}`
        );
        setCartItems((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        axios.post("https://662398043e17a3ac846fa3bf.mockapi.io/cart", obj);
        setCartItems((prev) => [...prev, obj]);
      }
    } catch (error) {}
  };

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://662398043e17a3ac846fa3bf.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
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
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== item.id));
      } else {
        const { data } = await axios.post(
          "https://662810af54afcabd0734c77d.mockapi.io/favorites", item);
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
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  }

  return (
    <AppContext.Provider value={{ items, cartItems, favorites, isItemAdded, onAddToFavorites, setCartOpened, setCartItems }}>
      <div className="wrapper clear">
        {cartOpened && (
          <Drawer
            items={cartItems}
            onClose={() => setCartOpened(false)}
            onRemove={onRemoveItem}
          />
        )}
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
          <Favorites/>
        </Route>
      </div>
    </AppContext.Provider>
  );
}
