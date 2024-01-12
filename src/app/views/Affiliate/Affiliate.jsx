import React from 'react';
import "./Affiliate.css"
import { GetReferralLink, handleRequest } from '../ApiBackend/ApiBackend';
import { useEffect, useState } from 'react';
import Loading from 'app/components/MatxLoading';
import { useSelector } from 'react-redux';
import { Row } from 'react-bootstrap';

const Affiliate = () => {
    const token = useSelector((state) => state.authToken)
    const [loading, setLoading] = useState(true);
    const [requests, setRequests] = useState(null);
    const [requestDetail, setRequestDetail] = useState([]);
    const [karnik, setKarnik] = useState({})
    console.log(karnik, "karnik");

    // console.log(token, ">>>>>>>>>token>>>>>>>>>>>>>");

    useEffect(() => {

        fetchPending();


    }, []);
    useEffect(() => {

        console.log("jjjjjj");

    }, [karnik]);

    async function fetchPending() {
        try {
            const response = await GetReferralLink(token);
            if (!response.status) {
                console.log("Netwroj kwas not okayyyy")
            }
            console.log("Referralresponse", response);
            setRequests(response.data);
            setRequestDetail(response.data.allRequests);
            console.log("this is response data", requests);
            console.log("this is request details", requestDetail);
            setLoading(false);

        }
        catch (error) {
            console.error("There was an error fetching data: ", error);
        }

    }

    if (loading) {
        return <div className="loader"><Loading /></div>;
    }

    const handleAccept = async (requestId) => {
        try {
            const response = await handleRequest(requestId, 'Success', token);
            console.log(response, ">>>>>>>reso");
            if (response.data.status === true) {
                setKarnik(response)
            }
            fetchPending();

            console.log("this is handleAccept", response);
        }
        catch (error) {
            console.error("Error fetcing requests,", error);
        }

    }

    const handleReject = async (requestId) => {
        try {
            const response = await handleRequest(requestId, 'Failure', token);
            if (response.status) {

                console.log("this is handleReject", response)

            }
            fetchPending();


        }
        catch (error) {
            console.error("Error fetcing requests,", error);
        }

    }

    return (
        <>

            <div>
                <h1>Pending Requests</h1>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>

                        <th scope="col">Id</th>
                        <th scope="col">Requested to Email</th>
                        <th scope="col">Requested on</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        requestDetail?.map((req) => (
                            <>
                                <tr key={req._id}>
                                    <td>{req._id}</td>
                                    <td>{req.requestorEmail}</td>
                                    <td>{new Date(req.requested_on).toLocaleString("en-IN")}</td>
                                    <td>{req.requestStatus}</td>

                                    <td>
                                        <div>

                                            {req.requestStatus === 'Pending' && (
                                                <>
                                                    <button className='btn btn-success ' onClick={() => handleAccept(req._id)}>Accept</button>
                                                    <button className='btn btn-danger' onClick={() => handleReject(req._id)}>Reject</button>
                                                </>
                                            )
                                            }
                                        </div>

                                    </td>
                                </tr>
                            </>
                        ))
                    }
                </tbody>
            </table>


        </>
    )
}

export default Affiliate;
