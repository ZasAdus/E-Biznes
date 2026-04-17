import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api/api';

function Payments({ onPurchase }) {
  const [products, setProducts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        alert("Błąd ładowania produktów");
      });
  }, []);

  const buy = async () => {
    if (!selectedId) {
      alert("Wybierz produkt");
      return;
    }

    try {
      const res = await fetch('http://localhost:8080/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productId: selectedId,
          quantity: quantity
        })
      });

      if (!res.ok) {
        throw new Error("Błąd zakupu");
      }

      alert("Zakup udany!");

      onPurchase?.();

    } catch (err) {
      alert("Zakup nieudany");
    }
  };

  if (loading) return <p>Ładowanie...</p>;

  return (
    <div>
      <h2>Payments</h2>

      <div style={{ marginBottom: 10 }}>
        <select
          onChange={(e) => setSelectedId(Number(e.target.value))}
        >
          <option value="">Wybierz produkt</option>

          {products.map(p => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: 10 }}>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </div>

      <button onClick={buy}>
        Kup
      </button>
    </div>
  );
}

export default Payments;