import React from "react";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import axios, { Axios } from "axios";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

export default function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    axios
      .get("https://662398043e17a3ac846fa3bf.mockapi.io/items")
      .then((res) => {
        setItems(res.data);
      });
    axios
      .get("https://662398043e17a3ac846fa3bf.mockapi.io/cart")
      .then((res) => {
        setCartItems(res.data);
      });
    axios
      .get("https://662810af54afcabd0734c77d.mockapi.io/favorites")
      .then((res) => {
        setFavorites(res.data);
        console.log(res.data);
      });
  }, []);

  const onAddToCart = (obj) => {
    setCartItems((prev) => [...prev, obj]);
    axios.post("https://662398043e17a3ac846fa3bf.mockapi.io/cart", obj);
  };

  const onRemoveItem = (id) => {
    console.log(id);
    axios.delete(`https://662398043e17a3ac846fa3bf.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onAddToFavorites = async (item) => {
    try {
      if (favorites.find(favItem => favItem.id === item.id)) {
        axios.delete(`https://662810af54afcabd0734c77d.mockapi.io/favorites/${item.id}`);
      } else {
        const { data } = await axios.post("https://662810af54afcabd0734c77d.mockapi.io/favorites", item);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в Фавориты')
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  function clearSearchInput() {
    setSearchValue("");
  }

  return (
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
          searchValue={searchValue}
          onChangeSearchInput={onChangeSearchInput}
          onAddToFavorites={onAddToFavorites}
          onAddToCart={onAddToCart}
          clearSearchInput={clearSearchInput}
        />
      </Route>
      <Route path="/favorites/" exact>
        <Favorites items={favorites} onAddToFavorites={onAddToFavorites} />
      </Route>

    </div>
  );
}
