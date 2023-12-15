import React, { useEffect, useState } from 'react';

const Workshop = ({ navigate }) => {
  const [token, setToken] = useState(window.localStorage.getItem('token'));
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    if (token) {
      function decodeJWT(token) {
        const [headerEncoded, payloadEncoded, signature] = token.split('.');
        const header = JSON.parse(atob(headerEncoded));
        const payload = JSON.parse(atob(payloadEncoded));
        return { header, payload, signature };
      }

      const decoded = decodeJWT(token);
      setDecodedToken(decoded);
    }
  }, [token]);

  return (
    <div>
      Workshop {token}
      {decodedToken ? (
        <div>
          payload: {JSON.stringify(decodedToken.payload)}
        </div>
      ) : (
        <div>No valid token found</div>
      )}
    </div>
  );
};

export default Workshop;
