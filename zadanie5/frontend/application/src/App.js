import React, { useState } from 'react';
import Products from './components/Products';
import Payments from './components/Payments';

function App() {
  const [refresh, setRefresh] = useState(0);

  const triggerRefresh = () => {
    setRefresh(r => r + 1);
  };

  return (
    <div>
      <Products refresh={refresh} />
      <Payments onPurchase={triggerRefresh} />
    </div>
  );
}

export default App;