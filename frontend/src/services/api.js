export async function signup(firstName, lastName, email, password) {
  const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/signup`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
  });
  const resp = await response.json();
  if (resp.error) {
    throw new Error(resp.error.message);
  }
  return resp;
}

export async function login(email, password) {
  const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/login`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
  });
  const resp = await response.json();
  if (resp.error) {
    throw new Error(resp.error.message);
  }
  return resp;
}
