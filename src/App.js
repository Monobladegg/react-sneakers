import React from "react";
import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";

const arr = [
  {
    "name": "Мужские кроссовки Nike Blazer Mid Suede",
    "price": 12999,
    "image": "/img/sneakers/1.jpg"
  },
  {
    "name": "Мужские Кроссовки Nike Air Max 270",
    "price": 15600,
    "image": "/img/sneakers/2.jpg"
  },
  {
    "name": "Мужские Кроссовки Nike Blazer Mid Suede",
    "price": 8499,
    "image": "/img/sneakers/3.jpg"
  },
  {
    "name": "Кроссовки Puma X Aka Boku Future Rider",
    "price": 8999,
    "image": "/img/sneakers/4.jpg"
  },
  {
    "name": "Мужские Кроссовки Under Armour Curry 8",
    "price": 15199,
    "image": "/img/sneakers/5.jpg"
  },
  {
    "name": "Мужские Кроссовки Nike Kyrie 7",
    "price": 11299,
    "image": "/img/sneakers/6.jpg"
  },
  {
    "name": "Мужские Кроссовки Jordan Air Jordan 11",
    "price": 10799,
    "image": "/img/sneakers/7.jpg"
  }
]

function App() {
  const [cartOpened, setCartOpened] = React.useState(false);
  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer onClose={() => setCartOpened(false)} />}
      <Header onClickCart={() => setCartOpened(true)} />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>
        <div className="d-flex">
          {arr.map((obj) => (
            <Card
            title={obj.name}
            price={obj.price}
            imageUrl={obj.image}
            onClickfavorite={() => console.log(`Вы добавили ${obj.name} в избранное`)}
            onClickPlus={() => console.log(obj)}
          />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
