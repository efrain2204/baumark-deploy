const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:4200';

const fetchSinToken = (endPoint, data, method = 'GET') =>{
  const url = `${baseURL}/${endPoint}`;
  if(method === 'GET'){
    return fetch(url);
  }else {
    return fetch(url,{
      method,
      headers:{
        'Content-type':'application/json'
      },
      body: JSON.stringify(data)
    });
  }
}

const fetchConToken = (endPoint, data, method = 'GET') =>{
  const url = `${baseURL}/${endPoint}`;
  const token = localStorage.getItem('token') || '';
  if(method === 'GET'){
    return fetch(url,{
      method,
      headers:{
        'Authorization': 'Bearer ' + token
      }
    });
  }else {
    return fetch(url,{
      method,
      headers:{
        'Content-type':'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(data)
    });
  }
}

export {
  fetchSinToken,
  fetchConToken
}
