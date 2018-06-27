const axios = require('axios');
const axiosClient = axios.create({
  baseURL: 'http://localhost:6999/api/v1' // FIXME 3000
});

export default axiosClient;