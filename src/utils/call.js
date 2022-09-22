import axios from 'axios';
import Config from '../config';

const call = async (method, path, data) => {
  const url = `${Config.api_base}/${path}`;

  const response = await axios({ method, url, data });
  return response.data;
};

export default call;
