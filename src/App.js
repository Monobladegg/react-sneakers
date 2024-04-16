import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";

const arr = [
  {
    name: "Мужские кроссовки Nike Blazer Mid Suede",
    price: "12 999",
    image: "/img/1.jpg",
  },
  {
    name: "Мужские Кроссовки Nike Air Max 270",
    price: "15 600",
    image: "/img/2.jpg",
  },
  {
    name: "Мужские Кроссовки Nike Blazer Mid Suede",
    price: "8 499",
    image: "/img/3.jpg",
  },
  {
    name: "Кроссовки Puma X Aka Boku Future Rider",
    price: "8 999",
    image: "/img/4.jpg",
  },
];

function App() {
  return (
    <div className="wrapper clear">
      <Drawer />
      <Header />
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
            onClick={() => console.log(obj)}
          />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
