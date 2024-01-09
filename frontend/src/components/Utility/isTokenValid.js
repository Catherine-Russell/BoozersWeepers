function isTokenValid(token) {
  if (!token) {
      return false;
  }

  const tokenPayload = token.split('.')[1];
  try {
      const decodedToken = decodeURIComponent(atob(tokenPayload).split('').map(c => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const parsedPayload = JSON.parse(decodedToken);

      if (!parsedPayload.exp) {return false;}

      const expirationTime = parsedPayload.exp * 1000;
      const currentTime = new Date().getTime();
      return currentTime < expirationTime;
  } catch (error) {
      console.error('Error decoding token:', error);
      return false;
  }
}

export default isTokenValid;
