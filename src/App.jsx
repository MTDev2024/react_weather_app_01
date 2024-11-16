import loader from "./assets/loader.svg"
import "./App.css"

function App() {
   return (

      <main>
        <div className="loader-container">
          <img src={loader} alt="loader icon" />
        </div>
        <div className="container">
        <div className="info-icon-container">
          <img src="/icons/01d.svg" className="info-icon" alt="weather icon"/>
        </div>
        <p className="temperature">24°</p>
        <p className="city-name">Montpellier</p>
        <p className="country-name">France</p>
        
        
        
        
        
        </div>
      </main>
  
  );
}

export default App;
