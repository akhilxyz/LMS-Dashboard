import "./index.css";
import React, { useState, useEffect } from 'react';
import { GetPaymentHistory } from "../ApiBackend/ApiBackend"
import Loading from "app/components/MatxLoading";
import { NavLink } from "react-router-dom";
import { it } from "date-fns/locale";
import { func } from "prop-types";
import "./History.css";


const History = () => {
  // const [payment, setPaymentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageItems = 8;
  // const [records, setRecords] = useState(null);
  const [totalResult, setTotalResult] = useState(0);
  const [currentItems, setCurrentItems] = useState(null);
  const [search, setSearch] = useState('');
  const [signal,setSignal] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setSignal(signal)
    fetchData();
    return () => {
      controller.abort();
     
    }
  }, [currentPage]);

  async function fetchData() {
    try {
      const response = await GetPaymentHistory(pageItems, currentPage,signal);
      
     
      if (!response.status) {
        return console.error('Network response was not oayyyyyyyyyyyyk');
      }
      // setPaymentData(response.data);
      // console.log("Repponseeeee", response.data);
      // console.log("responseeeecourse", response);
      setTotalResult(response.data.totalRecords);
      setCurrentItems(response.data.details);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const paginate = (pageNumber) => {
   
    setCurrentPage(pageNumber);
    // fetchData();
    
  };

  if (loading) {
    return <div className="loader"><Loading /></div>;
  }


  const renderPageNumbers = () => {
    const totalPages = Math.ceil(totalResult / pageItems);
    if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = [];
  const ellipsis = <li key="ellipsis" className="page-item disabled"><span className="page-link">...</span></li>;

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1) {
      pageNumbers.push(
        <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
          <a className="page-link" onClick={() => paginate(i)}>
            {i}
          </a>
        </li>
      );
    }

    // Show ellipsis if more than two pages and not on the first or last page
    else if (totalPages > 2 && i > 1 && i < totalPages) {
      if ( i === currentPage || i === currentPage + 1) {
        // Show the current page and adjacent pages
        pageNumbers.push(
          <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
            <a className="page-link" onClick={() => paginate(i)}>
              {i}
            </a>
          </li>
        );
      } else if (!pageNumbers.includes(ellipsis)) {
        // Insert ellipsis if not already added
        pageNumbers.push(ellipsis);
      }
    }

    // Show the last page
    else if (i === totalPages) {
      pageNumbers.push(
        <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
          <a className="page-link" onClick={() => paginate(i)}>
            {i}
          </a>
        </li>
      );
    }
  }

  return pageNumbers;
};
  return (
    <>
      {currentItems?.length > 0 && (
        
        <div>
          <div className="payment-history-header">
          <h1 >Payment History</h1>
           <div className="search-filter">
            
              <form className="d-flex" role="search" onSubmit={(e) => {
                e.preventDefault();
              }}>
        <input className="form-control me-2" type="search"   value={search}
                onChange={(e) => setSearch(e.target.value)} placeholder="Search" aria-label="Search"/>
        </form>
            </div>
            </div>
          <table className="courses-table">
            <thead>
              <tr>
                <th>Status</th>
                <th>User ID</th>
                <th>Email</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Courses</th>
    
              </tr>
            </thead>
            <tbody>
              {/* {currentItems?.filter((payment) => {
                return search.toLowerCase() === ""? payment : payment.email.toLowerCase().includes(search.toLowerCase())
              }) */}
                
              {currentItems?.filter((payment) => {
                const lowercaseSearch = search.toLowerCase();
                return (
                  payment.status.toLowerCase().includes(lowercaseSearch) ||
                  payment.email.toLowerCase().includes(lowercaseSearch) )}).map((payment) => (
                <tr key={payment._id}>
                  <td>
                   <span className={`${payment.status === 'Success' ? 'badge text-bg-success' : 'badge text-bg-danger'}`}>
                      {payment.status}
                    </span>
                      </td>
                     
                  <td className="user_id">
                        {payment.user !== undefined && payment.user !== null ? (
                          
                          <NavLink to={`/PaymentHistory/${payment.user}`}>
                          {payment.user}
                      </NavLink>
                    ) : (
                      <span>No User</span>
                    )}
                  </td>
                  <td className="email">
                    {payment.email !== undefined && payment.email !== null ? (
                   
                      payment.email
                    
                    ) : (
                      <span>No Mail Provided</span>
                    )}
                  </td>
                  <td>{new Date(payment.payed_on).toLocaleString("en-IN")}</td>
                      <td>{payment.amount}</td>
                      <td>{payment.courseBought.length}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <nav aria-label="Page navigation example" className="nav-pagee">
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <a className="page-link" onClick={() => paginate(currentPage - 1)} aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>

              {renderPageNumbers()}
              <li className={`page-item ${currentPage === Math.ceil(totalResult / pageItems) ? 'disabled' : ''}`}>
                <a className="page-link" onClick={() => paginate(currentPage + 1)} aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default History;

