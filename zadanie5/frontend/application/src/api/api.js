export async function fetchProducts() {
  const res = await fetch("http://localhost:8080/api/products");
  return res.json();
}

export async function updateProduct(id, data) {
  const res = await fetch(`http://localhost:8080/api/payments/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}