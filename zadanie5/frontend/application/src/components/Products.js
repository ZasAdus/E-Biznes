import React, { useEffect, useState } from "react";
import { fetchProducts } from "../api/api";

function Products({ refresh }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = () => {
    fetchProducts()
      .then(data => {
        setProducts(data.sort((a, b) => a.id - b.id));
        setLoading(false);
      })
      .catch(() => {
        setError("Błąd połączenia z serwerem");
        setLoading(false);
      });
  };

  useEffect(() => {
  load();
    }, [refresh]);

  if (loading) return <p>Ładowanie...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Products</h2>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nazwa</th>
            <th>Cena</th>
            <th>Dostępne</th>
          </tr>
        </thead>

        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;