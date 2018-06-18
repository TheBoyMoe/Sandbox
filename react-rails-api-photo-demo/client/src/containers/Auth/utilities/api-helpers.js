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
    .then(res => {
      return res;
    })
    .catch(err => console.log(err));
};

export const logout = () => { 
  console.log('Logout');
};

export const signup = (user) => {
  console.log('Signup', user);
};