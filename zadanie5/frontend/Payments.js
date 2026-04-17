import React, { useState } from 'react';

function Payments() {
  const [form, setForm] = useState({ productId: '', amount: '', cardNumber: '' });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setResult(null);
    setError(null);

    fetch('http://localhost:8080/api/payments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: parseInt(form.productId),
        amount: parseFloat(form.amount),
        cardNumber: form.cardNumber
      })
    })
      .then(res => res.json())
      .then(data => setResult(data.message))
      .catch(() => setError('Błąd połączenia z serwerem'));
  };

  return (
    <div>
      <h2>Płatności</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID Produktu: </label>
          <input name="productId" value={form.productId} onChange={handleChange} required />
        </div>
        <div>
          <label>Kwota (PLN): </label>
          <input name="amount" value={form.amount} onChange={handleChange} required />
        </div>
        <div>
          <label>Numer karty: </label>
          <input name="cardNumber" value={form.cardNumber} onChange={handleChange} required />
        </div>
        <button type="submit">Zapłać</button>
      </form>
      {result && <p style={{ color: 'green' }}>{result}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Payments;