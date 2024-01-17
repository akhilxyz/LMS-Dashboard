// import React from 'react';
// import "./Affiliate.css"
// import { GetReferralLink, handleRequest } from '../ApiBackend/ApiBackend';
// import { useEffect, useState } from 'react';
// import Loading from 'app/components/MatxLoading';
// import { useSelector } from 'react-redux';
// import { Row } from 'react-bootstrap';

// const Affiliate = () => {
//     const token = useSelector((state) => state.authToken)
//     const [loading, setLoading] = useState(true);
//     const [requests, setRequests] = useState(null);
//     const [requestDetail, setRequestDetail] = useState([]);
//     const [res setRes] = useState({})
//     console.log(res "karnik");

//     // console.log(token, ">>>>>>>>>token>>>>>>>>>>>>>");

//     useEffect(() => {

//         fetchPending();


//     }, []);
//     useEffect(() => {

//         console.log("jjjjjj");
//         // fetchPending();

//     }, [karnik]);

//     async function fetchPending() {
//         try {
//             const response = await GetReferralLink(token);
//             if (!response.status) {
//                 console.log("Netwroj kwas not okayyyy")
//             }
//             console.log("Referralresponse", response);
//             setRequests(response.data);
//             setRequestDetail(response.data.allRequests);
//             console.log("this is response data", requests);
//             console.log("this is request details", requestDetail);
//             setLoading(false);

//         }
//         catch (error) {
//             console.error("There was an error fetching data: ", error);
//         }

//     }

//     if (loading) {
//         return <div className="loader"><Loading /></div>;
//     }

//     const handleAccept = async (requestId) => {
//         try {
//             const response = await handleRequest(requestId, 'Success', token);
//             console.log(response, ">>>>>>>reso");
//             if (response.data.status === true) {
//                 setRes(response)
//             }
//             fetchPending();

//             console.log("this is handleAccept", response);
//         }
//         catch (error) {
//             console.error("Error fetcing requests,", error);
//         }

//     }

//     const handleReject = async (requestId) => {
//         try {
//             const response = await handleRequest(requestId, 'Failure', token);
//             if (response.status) {

//                 console.log("this is handleReject", response)

//             }
//             fetchPending();


//         }
//         catch (error) {
//             console.error("Error fetcing requests,", error);
//         }

//     }

//     return (
//         <>

//             <div>
//                 <h1>Pending Requests</h1>
//             </div>

//             <table className="table table-striped">
//                 <thead>
//                     <tr>

//                         <th scope="col">Id</th>
//                         <th scope="col">Requested to Email</th>
//                         <th scope="col">Requested on</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {
//                         requestDetail?.map((req) => (
//                             <>
//                                 <tr key={req._id}>
//                                     <td>{req._id}</td>
//                                     <td>{req.requestorEmail}</td>
//                                     <td>{new Date(req.requested_on).toLocaleString("en-IN")}</td>
//                                     <td>{req.requestStatus}</td>

//                                     <td>
//                                         <div>

//                                             {req.requestStatus === 'Pending' && (
//                                                 <>
//                                                     <button className='btn btn-success ' onClick={() => handleAccept(req._id)}>Accept</button>
//                                                     <button className='btn btn-danger' onClick={() => handleReject(req._id)}>Reject</button>
//                                                 </>
//                                             )
//                                             }
//                                         </div>

//                                     </td>
//                                 </tr>
//                             </>
//                         ))
//                     }
//                 </tbody>
//             </table>


//         </>
//     )
// }

// export default Affiliate;

import "./Affiliate.css";
import React, { useState, useEffect } from 'react';
import { GetReferralLink, handleRequest } from "../ApiBackend/ApiBackend"
import Loading from "app/components/MatxLoading";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { it } from "date-fns/locale";
import { func } from "prop-types";
import { Row } from "react-bootstrap";
// import "./History.css";


const Affiliate = () => {
    const token = useSelector((state) => state.authToken);
    const [loading, setLoading] = useState(true);
    const [requests, setRequests] = useState([]);
    const [requestDetail, setRequestDetail] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageItems = 8;
    const [totalResult, setTotalResult] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [signal, setSignal] = useState(null);
    const [res, setRes] = useState({});
    const [debounceTime, setDebounceTime] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        setSignal(signal);
        let isMounted = true;
        if (debounceTime) {
            clearTimeout(debounceTime);
        }
        
        const timeOut = setTimeout(() => {
            fetchPending();
        }, 800);
        // fetchPending();
        setDebounceTime(timeOut);
        return () => {
            controller.abort();
            clearTimeout(timeOut);

        }

    }, [currentPage, searchQuery, res]);

    // async function fetchPending() {
    //     try {
    //         const response = await GetReferralLink(token, pageItems, currentPage,searchQuery);
    //         if (!response.status) {
    //             console.log("Netwroj kwas not okayyyy")
    //         }
    //         console.log("Referralresponse", response);
    //         console.log("this is srespdfwe", response);
    //         setRequests(response.data);
    //         console.log("this is request dataaaaaa", response.data.allRequests);
    //         setTotalResult(response.data.totalRecords);
    //         setCurrentItems(response.data.allRequests);
    //         setRequestDetail(response.data.allRequests);
    //         console.log("this is response data", requests);
    //         console.log("this is request details", requestDetail);
    //         setLoading(false);

    //     }
    //     catch (error) {
    //         console.error("There was an error fetching data: ", error);
    //     }

    // }
    const fetchPending = async () => {
        try {
            const response = await GetReferralLink(token, pageItems, currentPage, searchQuery);
            if (!response.status) {
                console.log("Network was not okay");
            }
            // console.log("Referral response", response);
                setRequests(response.data);
                setTotalResult(response.data.totalRequests);
                setCurrentItems(response.data.allRequests);
            // console.log("this is response data", response.data.allRequests);
            // console.log("this is request details", response.data.allRequests);

            
            setRequestDetail(response.data.allRequests);
            
            // console.log("this is requestrefjisdofl", requestDetail);
                setLoading(false);
            
        } catch (error) {
            console.error("There was an error fetching data: ", error);
        }
    };


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

    const handleAccept = async (requestId) => {
        try {
            const response = await handleRequest(requestId, 'Success', token);
            // console.log(response, ">>>>>>>rehandle aceewfweso");
            if (response.data.status === true) {
                setRes(response)
            }
            fetchPending();

            // console.log("this is handleAccept", response);
        }
        catch (error) {
            // console.error("Error fetcing requests,", error);
        }

    }

    const handleReject = async (requestId) => {
        try {
            const response = await handleRequest(requestId, 'Failure', token);
            if (response.status) {

                // console.log("this is handleReject", response)

            }
            fetchPending();


        }
        catch (error) {
            console.error("Error fetcing requests,", error);
        }

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
                <div>
                    <h1 >Pending Requests</h1>
                    <div className="search-filter">

                        <form className="d-flex" role="search" onSubmit={(e) => {
                            e.preventDefault();
                           
                        }}>
                            <input className="form-control me-2" type="search" value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    handleSearchChange();

                                }} placeholder="Search" aria-label="Search" />
                        </form>
                    </div>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr><th scope="col">Status</th>
                            <th scope="col">Id</th>
                            <th scope="col">Requested to Email</th>
                            <th scope="col">Requested on</th>

                        </tr>
                    </thead>
                    <tbody>
                        {requestDetail?.length > 0 && (
                            requestDetail?.filter((requestss) => {
                                // console.log("this is resdfds", requestss.requestStatus);
                                const lowercaseSearch = searchQuery;
                            //     {
                            //         console.log("this is lowerCAse", searchQuery);
                            //         console.log("tjos os sjdfiosahfsudi", requestss);
                            //    }
                                return (
                                    requestss.requestStatus.toLowerCase().includes(lowercaseSearch) ||
                                    requestss.requestorEmail.toLowerCase().includes(lowercaseSearch)) 
                                    // requestss.amount.toLowerCase().includes(lowercaseSearch)
                            }).map((requestss) => (
                                    <tr key={requestss._id}>
                                        <td>
                                            <span className={`${requestss.requestStatus === 'Success' ? 'badge text-bg-success' : 'badge text-bg-danger'}`}>
                                                {requestss.requestStatus}
                                            </span>
                                    </td>
                                    <td>
                                        {requestss._id !== undefined && requestss._id !== null ? (

                                            requestss._id

                                        ) : (
                                            <span>No Mail Provided</span>
                                        )}
                                    </td>
                                        <td className="email">
                                        {requestss.requestorEmail !== undefined && requestss.requestorEmail !== null ? (

                                            requestss.requestorEmail

                                            ) : (
                                                <span>No Mail Provided</span>
                                            )}
                                        </td>
                                    <td>{new Date(requestss.requested_on).toLocaleString("en-IN")}</td>
                                        <td>{requestss.amount}</td>
                                        <td>
                                            <div>
                                                {requestss.requestStatus === "Pending" && (
                                                    <>
                                                        <button className='btn btn-success ' onClick={() => handleAccept(requestss._id)}>Accept</button>
                                                        <button className='btn btn-danger' onClick={() => handleReject(requestss._id)}>Reject</button>
                                                    </>
                                                )}
                                            </div>
                                        </td>

                                    </tr>
                                ))
                        )}


                        {requestDetail?.length === 0 && (
                            <tr>
                                <td colSpan="4" style={{
                                    color: "grey",
                                    textAlign: "center"
                                }}>No Results Found</td>
                            </tr>
                        )}

                    </tbody>
                </table>
                {requestDetail?.length >= 0 && (
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

export default Affiliate;