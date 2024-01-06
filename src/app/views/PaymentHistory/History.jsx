import "./index.css";
import React, { useState, useEffect } from 'react';
import { GetPaymentHistory } from "../ApiBackend/ApiBackend"
import Loading from "app/components/MatxLoading";
import { NavLink } from "react-router-dom";

const History = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(paymentData.details,"paymentData============");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetPaymentHistory();
        console.log(response, "payment");
        if (!response.status) {
          return ('Network response was not ok');
        }
        setPaymentData(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loader"><Loading /></div>;
  }


  return (
    <>
      {paymentData?.details?.length > 0 && (
        <div>
          <h1>Payment History</h1>
          <table className="courses-table">
            <thead>
              <tr>
                <th>Status</th>
                <th>User ID</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {paymentData?.details?.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.status}</td>
                  <td>
                  {payment.user !== undefined && payment.user !== null && (
                      <NavLink to={{ pathname: "/Historydetail", state: { userId: payment.user } }}>
                        {payment.user}
                      </NavLink>
                    )}
                  </td>
                  <td>{payment.payed_on}</td>
                  <td>{payment.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
};

export default History;
