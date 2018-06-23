export const signin = (data) => {
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

export const signout = () => { 
  console.log('Logout');
};

export const register = (user) => {
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

export const saveImage = (data) => {
  return fetch('/api/v1/images', {
    method: 'POST',
    body: data
  })
    .then(res => res)
    .catch(err => console.log('images#create error', err));
};