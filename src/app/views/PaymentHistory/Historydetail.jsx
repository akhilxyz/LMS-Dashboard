import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { GetPaymentHistoryById } from '../ApiBackend/ApiBackend';
import { useEffect, useState } from 'react';
import bootstrap from 'bootstrap';
import { useSelector } from "react-redux";


const Historydetail = () => {
  const token = useSelector((state) => state.authToken);
  const { userId } = useParams();
  const location = useLocation();

  console.log(location,"location===========");
  // const userId = location.state ? location.state.userId : null;
  console.log(userId, "userIddddddddd");

  const [userDetails, setUserDetails] = useState(null);

  console.log(userDetails, "userDetailssssssssssss");
  
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {

        const response = await GetPaymentHistoryById(token,userId);
        if (response.status === 200) {
          console.log("prespnosfaegfryukdl",response.data);
          setUserDetails(response.data.userData);
          console.log(response.data, "userDetailssssssssssss");
        } else {
          return ('Network response was not ok',response.status);
        }
      }
      catch (error) {
        console.error('Error fetching data:',error);
      }

      console.log(userDetails, "userDetailssssssssssss");
    }
    fetchUserDetails();

  }, [userId]);

  return (
    <>
      <div>
      <h1>User Details </h1>
        {userDetails ? (
                <div className="card" >
  <div className="card-body">
            <h5 className="card-title">{userDetails.userName} User</h5>
    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
  </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item"> User ID: { userId}</li>
            <li className="list-group-item">Email: {userDetails.email}</li>
    <li className="list-group-item">First Name: {userDetails.firstName}</li>
    <li className="list-group-item">Last Name: {userDetails.lastName}</li>
    
  </ul>
  {/* <div className="card-body">
    <a href="#" className="card-link">Card link</a>
    <a href="#" className="card-link">Another link</a>
  </div> */}
</div>
        // <div>
        //   <p>User ID: {userId}</p>
        //   <p>Email: {userDetails.email}</p>
        //   <p>First Name: {userDetails.firstName}</p>
        //   <p>Last Name: {userDetails.lastName}</p>
        //   <p>User Name: {userDetails.userName}</p>
        // </div>
      ) : (
        <p>Loading user data...</p>
      )}
      {/* {console.log(userDetails, "userDetails")} */}


        
        
    </div>
      </>
  );
}

export default Historydetail;
