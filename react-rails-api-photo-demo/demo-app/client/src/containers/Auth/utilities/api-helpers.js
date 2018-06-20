export const login = (data) => {
  return fetch('/user_token', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(data)
  })
    .then(res => res)
    .catch(err => console.log('Login error', err));
};

export const logout = () => { 
  console.log('Logout');
};

export const signup = (user) => {
  return fetch('/api/v1/users', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(user)
  })
    .then(res => res)
    .catch(err => console.log('Signup error:', err));
};