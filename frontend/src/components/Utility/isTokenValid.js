function isTokenValid(token) {
    if (!token) {return false;}

    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    if (!tokenPayload.exp) {return false;}

    const expirationTime = tokenPayload.exp * 1000; 
    const currentTime = new Date().getTime(); 
    return currentTime < expirationTime;
  }

  export default isTokenValid;