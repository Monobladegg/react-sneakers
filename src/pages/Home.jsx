import Card from "../components/Card";

function Home( {items, searchValue, clearSearchInput, onChangeSearchInput, onAddToFavorites, onAddToCart} ) {
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>
          {searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}
        </h1>
        <div className="search-block">
          <img src="/img/search.svg" alt="Search" />
          {searchValue ? (
            <img
              onClick={clearSearchInput}
              className="clear removeBtn cu-p"
              src="/img/btn-remove.svg"
              alt="Clear"
            />
          ) : null}
          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder="Поиск..."
          />
        </div>
      </div>
      <div className="d-flex flex-wrap">
        {items
          .filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()))
          .map((item, index) => (
            <Card
              key={index}
              title={item.name}
              price={item.price}
              imageUrl={item.image}
              onFavorite={(item) => onAddToFavorites(item)}
              onPlus={(obj) => onAddToCart(obj)}
            />
          ))}
      </div>
    </div>
  );
}

export default Home;