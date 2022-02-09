// Import Styles
import './App.css';

// Import Data
import stores from './data/stores';
import items from './data/items';

// Import Dependencies
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {MdShoppingCart} from 'react-icons/md'

// Import Pages
import HomePage from './pages/HomePage';
import ShoppingListPage from './pages/ShoppingListPage';
import StoreListPage from './pages/StoreListPage';

// Import Components
import Navigation from './components/Navigation';
import Footer from './components/Footer';

function App() {  

  return (
    <div className="App">
      
        <Router>
          <header className="App-header">
            
            <h1 className="header-component">Shopping App</h1>
            <p>Order groceries, and find a store conveniently near you.</p>
            <MdShoppingCart className="App-logo header-component"/>
          </header>
          <Navigation className="nav"/>
            <main>
              {/* These need to be definend in the App.js file? */}
              <Route path="/" exact>
                  <HomePage />
              </Route>
              <Route path="/shoppinglist">
                  <ShoppingListPage items={items}/>
              </Route>
              <Route path="/stores">
                  <StoreListPage stores={stores}/>
              </Route>
              {/* End of route definition */}
            </main>
            <footer>
              <Footer id="footer"/>
            </footer>

      </Router>
      

    </div>
  );
}

export default App;
