import React from 'react';
import { useLocation } from 'react-router-dom';

const Historydetail = (props) => {
  const location = useLocation();
  console.log(location,"location===========");
  const userId = location.state ? location.state.userId : null;

  return (
    <div>
      <h1>User Details </h1>
         <h2>{userId}</h2>
      {/* {userId ? (
        <p>User ID: {userId}</p>
      ) : (
        <p>User ID not available</p>
      )} */}
    </div>
  );
}

export default Historydetail;
