


// import React, { useState, useEffect } from "react";
// import { GetCoursesById, GetLessonsById } from "../ApiBackend/ApiBackend";
// import EditCourceModal from "./EditCourceModal";
// import { useParams } from "react-router-dom";
// import "./CourseDetail.css"; // You can create a separate CSS file for styling

// const CourseDetail = () => {
//     const { courseId } = useParams();
//     const [shouldUpdate, setShouldUpdate] = useState(false);
//     const [courseDetails, setCourseDetail] = useState(null);
//     const [lessons, setLessons] = useState([]);
//     const [editCourseId, setEditCourseId] = useState(null);
//     const [editCourseDetails, setEditCourseDetails] = useState(null);
//     // const [showModal, setShowModal] = useState(false);
//     const [showEditModal, setShowEditModal] = useState(false);
//     const [isFetchingLessons, setFetchingLessons] = useState(false);
//     const [activeTab, setActiveTab] = useState("courseDetails");

//     useEffect(() => {
//         const fetchCourseDetails = async () => {
//             try {
//                 const response = await GetCoursesById(courseId);
//                 if (response.status === 200) {
//                     setCourseDetail(response.data.course);
//                 }
//             } catch (error) {
//                 console.error("Error fetching data", error);
//             }
//         };

//         fetchCourseDetails();
//     }, [courseId, showEditModal]);

//     const handleFetchLessons = async () => {
//         try {
//             setFetchingLessons(true);
//             const response = await GetLessonsById(courseId);
//             if (response.status === 200) {
//                 setLessons(response.data.lesson);
//                 console.log("this is lesssonsss", response)
//             }
//         } catch (error) {
//             console.error("Error fetching lessons", error);
//         } finally {
//             setFetchingLessons(false);
//         }
//     };


//     const handleTabChange = (tab) => {
//         setActiveTab(tab);
//     }
//     const handleEdit = async (_id) => {
//         try {

//             // const courseDetails = await fetchCourseDetails(_id);
//             setEditCourseId(_id);
//             setEditCourseDetails([courseDetails]);
//             console.log("this is coursedit details", [courseDetails]);
//             setShowEditModal(true);
//         } catch (error) {
//             console.error('Error fetching course details:', error);
//         }
//     };

//     const handleCourseUpdated = (courseId, updatedValues) => {
//         setCourseDetail((prevCourses) =>
//             prevCourses
//                 ? { ...prevCourses, ...{ [courseDetails._id]: { ...prevCourses[courseId], ...updatedValues } } }
//                 : {}
//         );
//     };

//     const toggleUpdate = () => {
//         setShouldUpdate((prev) => !prev);
//     };

//     const handleCloseEditModal = () => {
//         setShowEditModal(false);
//         setEditCourseId(null);
//         setEditCourseDetails(null);
//     }
//     return (
//         <>

//             <div className="course-detail-container">


//                 <div className="card text-center">
//                     <div className="card-header">
//                         <ul className="nav nav-tabs card-header-tabs">
//                             <li className="nav-item">
//                                 <a className={`nav-link ${activeTab === "courseDetails" ? "active" : " "}`} onClick={() => handleTabChange("courseDetails")}>
//                                     Course Details
//                                 </a>
//                             </li>
//                             <li className="nav-item">
//                                 <a className={`nav-link ${activeTab === "lessons" ? "active" : ""}`} onClick={() => { handleFetchLessons(); handleTabChange("lessons"); }}
//                                     disabled={isFetchingLessons}>
//                                     Lessons
//                                 </a>
//                             </li>
//                         </ul>
//                     </div>
//                     <div className="card-body">
//                         {activeTab === "courseDetails" && courseDetails ? (
//                             <>
//                                 <div className="headerrr">
//                                     <h1 className="card-title">{courseDetails.title}</h1>
//                                     {/* <div className="Editt">

//                                         <button className="edit-btn" onClick={() => handleEdit(courseDetails?._id)}>Edit</button>
//                                     </div> */}

//                                 </div>
//                                 <img
//                                     src={courseDetails.imageUrl} // Placeholder image URL
//                                     alt="Course Image"
//                                     className="course-image img-fluid"
//                                 />
//                                 <ul className="list-group list-group-flush">

//                                     <li className="list-group-item">
//                                         <span className="titlesss">Category: </span>
//                                         {courseDetails.category ? courseDetails.category : " No category Given"}
//                                     </li>
//                                     <li className="list-group-item">
//                                         <span className="titlesss">Subject: </span>
//                                         {/* {courseDetails.subject} */}
//                                         <textarea value={courseDetails.subject}></textarea>
//                                     </li>


//                                     <li className="list-group-item">
//                                         <span className="titlesss">Description: </span>
//                                         {courseDetails.description}
//                                     </li>

//                                     <li className="list-group-item">
//                                         <span className="titlesss">Requirements: </span>
//                                         {courseDetails.requirements}
//                                     </li>

//                                     <li className="list-group-item">
//                                         <span className="titlesss">Instructor: </span>
//                                         {courseDetails.instructor}
//                                     </li>
//                                     <li className="list-group-item">
//                                         <span className="titlesss">Price: </span>
//                                         {courseDetails.price}
//                                     </li>

//                                 </ul>
//                             </>
//                         ) :
//                             null
//                         }

//                         {activeTab === "lessons" && lessons.length > 0 ? lessons.map((lesson) => (
//                             <div className="lessons-container">

//                                 <h1 className="card-title lesson">{lesson.title}</h1>
//                                 <ul className="list-group list-group-flush">

//                                     <li key={lesson._id} className="list-group-item">
//                                         <span className="titlesss">{lesson.title}: </span>
//                                         <p>{lesson.content}</p>
//                                     </li>
//                                 </ul>

//                             </div>
//                         )

//                         ) :
//                             null
//                         }
//                     </div>
//                 </div>
//             </div>
//             <EditCourceModal
//                 isOpen={showEditModal}
//                 onClose={() => {
//                     handleCloseEditModal();
//                     toggleUpdate();
//                 }}
//                 courseId={editCourseId}
//                 courseDetails={editCourseDetails}
//                 onCourseUpdated={handleCourseUpdated}
//             />
//             {/* <AddCourseModal isOpen={showModal} onClose={handleCloseModal} onAddCourse={handleAddCourse} /> */}
//         </>
//     );
// };

// export default CourseDetail;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GetCoursesById, GetLessonsById, EditCource } from "../ApiBackend/ApiBackend";
import "./CourseDetail.css";

const CourseDetail = () => {
    const { courseId } = useParams();
    const [shouldUpdate, setShouldUpdate] = useState(false);
    const [courseDetails, setCourseDetail] = useState(null);
    const [lessons, setLessons] = useState([]);
    const [isFetchingLessons, setFetchingLessons] = useState(false);
    const [activeTab, setActiveTab] = useState("courseDetails");

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const response = await GetCoursesById(courseId);
                if (response.status === 200) {
                    setCourseDetail(response.data.course);
                }
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchCourseDetails();
    }, [courseId, shouldUpdate]);

    const handleFetchLessons = async () => {
        try {
            setFetchingLessons(true);
            const response = await GetLessonsById(courseId);
            if (response.status === 200) {
                setLessons(response.data.lesson);
            }
        } catch (error) {
            console.error("Error fetching lessons", error);
        } finally {
            setFetchingLessons(false);
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleEdit = async (_id) => {
        try {
            const response = await GetCoursesById(courseId);
            if (response.status === 200) {
                setCourseDetail(response.data.course);
            }
            setActiveTab("courseDetails");
        } catch (error) {
            console.error('Error fetching course details:', error);
        }
    };

    const handleCourseUpdated = async (updatedValues) => {
        try {
            const res = await EditCource({ _id: courseId, values: updatedValues });
            if (res && res.message === 'updated successfully') {
                setShouldUpdate((prev) => !prev);
            }
        } catch (error) {
            console.error('Error updating course details:', error);
        }
    };

    const handleSubmitChanges = () => {
        const updatedValues = {
            title:courseDetails.title,
            subject: courseDetails.subject,
            description: courseDetails.description,
            requirements: courseDetails.requirements,
            instructor: courseDetails.instructor,
            price: courseDetails.price,
            // Add other fields as needed
        };

        handleCourseUpdated(updatedValues);
    };

    return (
        <div className="course-detail-container">
            <div className="card text-center">
                <div className="card-header">
                    <ul className="nav nav-tabs card-header-tabs">
                        <li className="nav-item">
                            <a className={`nav-link ${activeTab === "courseDetails" ? "active" : ""}`} onClick={() => handleTabChange("courseDetails")}>
                                Course Details
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={`nav-link ${activeTab === "lessons" ? "active" : ""}`}
                                onClick={() => {
                                    handleFetchLessons();
                                    handleTabChange("lessons");
                                }}
                                disabled={isFetchingLessons}
                            >
                                Lessons
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="card-body">
                    {activeTab === "courseDetails" && courseDetails ? (
                        <>
                            <div className="courseDetails">
                                <h1 className="card-title">{courseDetails.title}</h1>

                                <div className="Course_img">
                                    <img src={courseDetails.imageUrl} alt="Course Image"  />
                                </div>
                                <form>
                                    <ul className="list-group list-group-flush">

                                        <li className="list-group-item">
                                            <span className="titlesss">Title: </span>
                                            <textarea
                                                value={courseDetails.title}
                                                onChange={(e) => setCourseDetail((prev) => ({ ...prev, title: e.target.value }))}
                                            />
                                        </li>
                                        <li className="list-group-item">
                                            <span className="titlesss">Category: </span>
                                            <textarea value={courseDetails.category ? courseDetails.category : " No category Given"} readOnly />
                                        </li>
                                        
                                        <li className="list-group-item">
                                            <span className="titlesss">Subject: </span>
                                            <textarea
                                                value={courseDetails.subject}
                                                onChange={(e) => setCourseDetail((prev) => ({ ...prev, subject: e.target.value }))}
                                            />
                                        </li>
                                        <li className="list-group-item">
                                            <span className="titlesss">Description: </span>
                                            <textarea
                                                value={courseDetails.description}
                                                onChange={(e) => setCourseDetail((prev) => ({ ...prev, description: e.target.value }))}
                                            />
                                        </li>
                                        <li className="list-group-item">
                                            <span className="titlesss">Requirements: </span>
                                            <textarea
                                                value={courseDetails.requirements}
                                                onChange={(e) => setCourseDetail((prev) => ({ ...prev, requirements: e.target.value }))}
                                            />
                                        </li>
                                        <li className="list-group-item">
                                            <span className="titlesss">Instructor: </span>
                                            <textarea
                                                value={courseDetails.instructor}
                                                onChange={(e) => setCourseDetail((prev) => ({ ...prev, instructor: e.target.value }))}
                                            />
                                        </li>
                                        <li className="list-group-item">
                                            <span className="titlesss">Price: </span>
                                            <textarea
                                                value={courseDetails.price}
                                                onChange={(e) => setCourseDetail((prev) => ({ ...prev, price: e.target.value }))}
                                            />
                                        </li>
                                                    </ul>
                                </form>
                                <button type="button" className="submitt_course btn btn-primary" onClick={handleSubmitChanges}>
                                    Save Details
                                </button>
                            </div>
                        </>
                    ) : null}

                    {activeTab === "lessons" && lessons.length > 0
                        ? lessons.map((lesson) => (
                            <div className="lessons-container" key={lesson._id}>
                                <h1 className="card-title lesson">{lesson.title}</h1>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <span className="titlesss">{lesson.title}: </span>
                                        <p>{lesson.content}</p>
                                    </li>
                                </ul>
                            </div>
                        ))
                        : null}
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;

