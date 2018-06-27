export const signin = (data) => {
  // FIXME '/user_token'
  return fetch('http://localhost:6999/user_token', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    // credentials: 'include', // FIXME
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
    // credentials: 'include', // FIXME
    body: JSON.stringify(user)
  })
    .then(res => res)
    .catch(err => console.log('Signup error:', err));
};

export const saveImage = (data) => {
  console.log(data);
  return fetch('/api/v1/images', {
    method: 'POST',
    headers: {
      // 'Content-Type': 'multipart/form-data'
      // 'Content-Type': 'image/jpeg'
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: data
  })
    .then(res => res)
    .catch(err => console.log('images#create error', err));
};