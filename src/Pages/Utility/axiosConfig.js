import axios from 'axios';

const axiosConfig = axios.create({ 
      // baseURL: 'http://localhost:4001/api',
      // });
      baseURL : 'https://evangadi-forum-group4-team2-1.onrender.com/api',
});

export default axiosConfig;