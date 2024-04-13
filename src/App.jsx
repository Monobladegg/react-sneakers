import SneakerCard from "./components/SneakerCard";
import sneakers from "./sneakers";

function App() {
  return (
    <div className="wrapper clear">
      <header className="d-flex justify-between align-center p-40">
        <div className="d-flex align-center">
          <img width={40} height={40} src="/img/logo.png" alt="Logo" />
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
        <ul className="d-flex">
          <li className="mr-30">
            <img width={18} height={18} src="/img/cart.svg" alt="Cart" />
            <span>1205 руб.</span>
          </li>
          <li>
            <img width={18} height={18} src="/img/user.svg" alt="User" />
          </li>
        </ul>
      </header>
      <div className="content p-40">
        <h1>Все кроссовки</h1>

        <div className="d-flex">
          {/* Iterating by array of sneakers and mapping each object to a sneaker card */}
          {sneakers.map((sneaker, index) => (
            <SneakerCard
              key={index}
              title={sneaker.title}
              price={sneaker.price}
              imgSrc={sneaker.imgSrc}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
