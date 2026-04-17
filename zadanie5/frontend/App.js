import React, { useState } from 'react';
import Products from './components/Products';
import Payments from './components/Payments';

function App() {
  const [page, setPage] = useState('products');

  return (
    <div>
      <nav>
        <button onClick={() => setPage('products')}>Produkty</button>
        <button onClick={() => setPage('payments')}>Płatności</button>
      </nav>
      <hr />
      {page === 'products' && <Products />}
      {page === 'payments' && <Payments />}
    </div>
  );
}

export default App;