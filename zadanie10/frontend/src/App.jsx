import { useEffect, useState } from 'react';

const API_BASE_URL =
  window.__APP_CONFIG__?.VITE_API_BASE_URL ?? import.meta.env.VITE_API_BASE_URL ?? '/api/auth';

function getModeFromPath(pathname) {
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';
  return normalizedPath === '/auth/register' ? 'register' : 'login';
}

function getPathForMode(mode) {
  return mode === 'register' ? '/auth/register' : '/auth/login';
}

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
  const [mode, setMode] = useState(() => getModeFromPath(window.location.pathname));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const handlePopState = () => {
      setMode(getModeFromPath(window.location.pathname));
      setStatus('');
      setUserId(null);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const switchMode = (nextMode) => {
    if (nextMode === mode) {
      return;
    }

    window.history.pushState({}, '', getPathForMode(nextMode));
    setMode(nextMode);
    setStatus('');
    setUserId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setStatus(mode === 'login' ? 'Logowanie...' : 'Rejestracja...');

    try {
      const result = await requestJson(mode === 'login' ? '/login' : '/register', {
        email,
        password,
      });

      if (!result.ok) {
        throw new Error(
          result.payload?.message ||
            (mode === 'login' ? 'Nie udało się zalogować.' : 'Nie udało się zarejestrować.'),
        );
      }

      setUserId(result.payload.userId ?? null);
      setStatus(result.payload.message || (mode === 'login' ? 'Zalogowano pomyślnie.' : 'Rejestracja zakończona pomyślnie.'));
    } catch (error) {
      setUserId(null);
      setStatus(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <h1>{mode === 'login' ? 'Logowanie' : 'Rejestracja'}</h1>
      <form noValidate onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <br />
          <input
            id="email"
            type="text"
            autoComplete="username"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div style={{ marginTop: '8px' }}>
          <label htmlFor="password">Hasło</label>
          <br />
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div style={{ marginTop: '12px' }}>
          <button id="submit" type="submit" disabled={loading} style={{ marginLeft: '8px' }}>
            {mode === 'login' ? 'Zaloguj' : 'Zarejestruj'}
          </button>
          <button
            id="switch-mode"
            type="button"
            onClick={() => switchMode(mode === 'login' ? 'register' : 'login')}
            disabled={loading}
            style={{ marginLeft: '8px' }}
          >
            {mode === 'login' ? 'Przejdź do rejestracji' : 'Przejdź do logowania'}
          </button>
        </div>
      </form>
      <p>Status: {status}</p>
      {userId !== null ? <p>ID użytkownika: {userId}</p> : null}
    </main>
  );
}
