
import "./index.css";
import React, { useState, useEffect } from 'react';
import { GetAllDetails, GetPaymentHistory } from "../ApiBackend/ApiBackend"
import Loading from "app/components/MatxLoading";
import { NavLink } from "react-router-dom";
import { it } from "date-fns/locale";
import { func } from "prop-types";
import "./History.css";
import { useSelector } from "react-redux";



const History = () => {
  const token = useSelector((state) => state.authToken);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageItems = 8;
  const [totalResult, setTotalResult] = useState(0);
  const [currentItems, setCurrentItems] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [signal, setSignal] = useState(null);
  const [debounceTime, setDebounceTime] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setSignal(signal);
    if (debounceTime) {
      clearTimeout(debounceTime);
    }
    const timeOut= setTimeout(() => {
      fetchData();
    }, 800);
    // fetchData();
    setDebounceTime(timeOut);
    return () => {
      controller.abort();
      clearTimeout(timeOut);

    }
  }, [currentPage,searchQuery]);

  async function fetchData() {
    try {
      const response = await GetPaymentHistory(token,pageItems, currentPage,searchQuery,signal);
      // console.log("this is strepsisf;oeahrfi", response);
      if (!response.status) {
        return console.error('Network response was not oayyyyyyyyyyyyk');
      }
     
      setTotalResult(response.data.totalRecords);
      setCurrentItems(response.data.details);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const paginate = (pageNumber) => {

    setCurrentPage(pageNumber);
  };
  const handleSearchChange = (e) => {
    // Clear the previous debounce timeout
    if (debounceTime) {
      clearTimeout(debounceTime);
    }

    // Set a new timeout for debouncing
    const timeoutId = setTimeout(() => {
      setSearchQuery(e.target.value);
    }, 800); // Adjust the debounce time as needed

    // Save the timeout ID in state
    setDebounceTime(timeoutId);
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

      else if (totalPages > 2 && i > 1 && i < totalPages) {
        if (i === currentPage || i === currentPage + 1) {
          pageNumbers.push(
            <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
              <a className="page-link" onClick={() => paginate(i)}>
                {i}
              </a>
            </li>
          );
        } else if (!pageNumbers.includes(ellipsis)) {
          pageNumbers.push(ellipsis);
        }
      }

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
   

        <div>
          <div className="payment-history-header">
            <h1 >Payment History</h1>
            <div className="search-filter">

              <form className="d-flex" role="search" onSubmit={(e) => {
                e.preventDefault();
                fetchData();
              }}>
                <input className="form-control me-2" type="search" value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  handleSearchChange();
                 
                }} placeholder="Search" aria-label="Search" />
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
            {currentItems?.length > 0 && (
              currentItems?.filter((payment) => {
                const lowercaseSearch = searchQuery.toLowerCase();
                return (
                  payment.status.toLowerCase().includes(lowercaseSearch) ||
                  payment.email.toLowerCase().includes(lowercaseSearch)) ||
                  payment.amount.toLowerCase().includes(lowercaseSearch)
              })
                .map((payment) => (
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
                ))
            )}
            {currentItems?.length === 0 && (
                <tr>
                <td colSpan="6" style={{
                  color: "grey",
                textAlign:"center"}}>No Results Found</td>
                </tr>
              )}
            
            </tbody>
          </table>
        {totalResult >= 8 && (
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
        )}
        </div>
    </>
  );
};

export default History;