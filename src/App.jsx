
import { useEffect, useState } from 'react';
import './App.css';
import "./app.scss"
function App() {
  const [products, setProducts] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then(res => res.json())
      .then(data => {
        setProducts(data)
      })
  }, [])

  function handleToggle() {
    setToggle(!toggle)
    document.body.classList.toggle("dark")
  }

  function handleInput(e) {
    setInputValue(e.target.value)
  }


  return (
    <div className="App">
      <nav>
        <div className="container">
          <h2>Where in the world</h2>
          <button className='mode' onClick={handleToggle}>{toggle ? <i class="fa-solid fa-moon"></i>   : <i class="fa-solid fa-sun"></i>}</button>
        </div>
      </nav>

      <div id="functions">
        <div className="container">
          <div className="searching">
            <button><i class="fa-solid fa-magnifying-glass"></i></button>
            <input onChange={(e)=> handleInput(e)} type="text" />
          </div>
          <div className="filtering">
            <select name="" id="">
              <option value="">Filter by Region</option>
              <option value="Africa">Africa</option>
              <option value="America">America</option>
              <option value="asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
          </div>
        </div>
      </div>


      <div className="products_container">
       { products.filter(x=>x.name.common.toLowerCase().includes(inputValue.toLowerCase()))
       .map((x) => (
          
            <ul className='products' key={x.population}>
              <img src={x.flags.png} alt="" />
              <h1>{x.name.common}</h1>
              <li>Population: {x.population}</li>
              <li>Region: {x.region}</li>
              <li>Capital: {x.capital}</li>
            </ul>
          
        ))}
        </div>
    </div>
  );
}

export default App;
