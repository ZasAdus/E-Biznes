import { useState } from 'react';

const API_BASE_URL = 'http://localhost:8080/auth';

async function requestJson(path, body) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json')
    ? await response.json()
    : { message: await response.text() };

  return {
    ok: response.ok,
    status: response.status,
    payload,
  };
}

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleLogin = async () => {
    setLoading(true);
    setStatus('Logowanie...');

    try {
      const result = await requestJson('/login', {
        email: email,
        password,
      });

      if (!result.ok) {
        throw new Error(result.payload?.message || 'Nie udało się zalogować.');
      }

      setUserId(result.payload.userId ?? null);
      setStatus(result.payload.message || 'Zalogowano pomyślnie.');
    } catch (error) {
      setUserId(null);
      setStatus(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <h1>Logowanie</h1>
      <div>
        <label htmlFor="email">Email</label>
        <br />
        <input id="email" value={email} onChange={(event) => setEmail(event.target.value)}autoComplete="username"/>
      </div>
      <div style={{ marginTop: '8px' }}>
        <label htmlFor="password">Hasło</label>
        <br />
        <input id="password" value={password} onChange={(event) => setPassword(event.target.value)} type="password" autoComplete="current-password"/>
      </div>
      <div style={{ marginTop: '12px' }}>
        <button type="button" onClick={handleLogin} disabled={loading} style={{ marginLeft: '8px' }}>Zaloguj</button>
      </div>
      <p>Status: {status}</p>
    </main>
  );
}
