import Product from './components/Product.jsx';
import Header from './components/Header.jsx';
import Shop from './components/Shop.jsx';
import ManageShoppingCart from './store/Shopping-Cart-Context.jsx';
import { DUMMY_PRODUCTS } from './dummy-products.js';

function App() {
  return (
    <ManageShoppingCart>
      <Header/>
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product}/>
          </li>
        ))}
      </Shop>
    </ManageShoppingCart>
  );
}

export default App;
