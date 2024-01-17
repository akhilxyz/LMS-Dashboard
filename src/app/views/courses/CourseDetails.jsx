
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GetCoursesById, GetLessonsById, EditCource, EditLesson, AddLesson, DeleteLesson } from "../ApiBackend/ApiBackend";
import "./CourseDetail.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddLessonModal from "./AddLessonsModal";
import { useSelector } from "react-redux";


const CourseDetail = () => {
    const { courseId } = useParams();
    const token = useSelector((state) => state.authToken);
    const [shouldUpdate, setShouldUpdate] = useState(false);
    const [courseDetails, setCourseDetail] = useState(null);
    const [lessons, setLessons] = useState([]);
    const [isFetchingLessons, setFetchingLessons] = useState(false);
    const [activeTab, setActiveTab] = useState("courseDetails");
    const [showModal, setShowModal] = useState(false);
    const [lessonValues, setLessonValues] = useState({
        title: '',
        content: '',
        videoUrl: '',
    });
    const [lessonDetailsSaved, setLessonDetailsSaved] = useState(false);
    const [del, setDel] = useState(false)




    const handleAddLessonClick = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        // Reset modal-related state when closing
        setShowModal(false);
        setLessonValues({
            title: '',
            content: '',
            videoUrl: '',
        });
        setLessonDetailsSaved(false);
    };

    const fetchCourseDetails = async () => {
        try {
            const response = await GetCoursesById(token, courseId);
            if (response.status === 200) {
                setCourseDetail(response.data.course);
            }
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };
    const handleFetchLessons = async () => {
        try {
            setFetchingLessons(true);
            const response = await GetLessonsById(token, courseId);
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
        if (tab === "lessons") { 
            handleFetchLessons();
        }
    };
    useEffect(() => {
        fetchCourseDetails();
    }, [courseId, showModal]);

    useEffect(() => {
        if (del) {
            handleFetchLessons();
            setDel(false);
        }
    }, [del]);

    const handleAddLesson = async () => {
        try {
            console.log("ful karnik")
            const res = await AddLesson(token, { courseId, values: lessonValues });
            if (res.status) {
                // setShouldUpdate((prev) => !prev);
                // setLessonValues(lessonValues);
                setLessonDetailsSaved(true);
                toast.success('Lesson added successfully!');
                setShowModal(false);
                // handleCloseModal();
                handleFetchLessons();
               

            }
        } catch (error) {
            console.error('Error adding lesson:', error);
        }
    };
    const handleDeleteLesson = async (lessonId) => {
        try {
            const res = await DeleteLesson(token, lessonId);
            if (res.status) {
                // setDel(true)
                // setShouldUpdate((prev) => !prev);
                toast.success('Lesson deleted successfully!');
                handleFetchLessons();
            }
            handleFetchLessons();

        } catch (error) {
            console.error('Error deleting lesson:', error);
        }
    };

    const handleCourseUpdated = async (updatedValues) => {
        try {
            const res = await EditCource(token, { _id: courseId, values: updatedValues });
            if (res && res.message === 'updated successfully') {
                setShouldUpdate((prev) => !prev);
            }
        } catch (error) {
            console.error('Error updating course details:', error);
        }
    };
  
    const handleSaveLessonDetails = async (lessonId) => {
       
        
            await handleSubmitLessonChanges(lessonId);
        
    };
  

    const handleSubmitChanges = async () => {
        const updatedValues = {
            title: courseDetails.title,
            subject: courseDetails.subject,
            description: courseDetails.description,
            requirements: courseDetails.requirements,
            instructor: courseDetails.instructor,
            price: courseDetails.price,
            // Add other fields as needed
        };
        try {
            const res = await EditCource(token, { _id: courseId, values: updatedValues });
            if (res && res.message === 'updated successfully') {
                setShouldUpdate((prev) => !prev);
                toast.success('Successfully saved!');
            }
        } catch (error) {
            console.error('Error updating course details:', error);
        }

        handleCourseUpdated(updatedValues);
    };

    const handleSubmitLessonChanges = async (lessonId) => {
        const lessonToUpdate = lessons.find(lesson => lesson._id === lessonId);
        if (!lessonToUpdate) {
            console.error('Lesson not found for id:', lessonId);
            return;
        }
    
        const updatedValues = {
            title: lessonToUpdate.title,
            content: lessonToUpdate.content,
            videoUrl: lessonToUpdate.videoUrl
                 };
        try {
            const res = await EditLesson(token, { _id: lessonId, values: updatedValues });
            const { title, content, videoUrl } = updatedValues;
            console.log("tittle", lessonToUpdate.title);
            console.log("first content",lessonToUpdate.content);
            console.log("first videoUrl", lessonToUpdate.videoUrl);
            console.log("this is edit lessons values", updatedValues);
            console.log("this is edit lessons id", lessonId);
            if (res && res.message === 'updated successfully') {
                setShouldUpdate((prev) => !prev);
                await toast.success('Successfully saved!');
            }
        } catch (error) {
            console.error('Error updating course details:', error);
        }

       
        // handleLessonUpdated(lessonId, updatedValues);
    };
    return (
        <>
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
                                        <img src={courseDetails.imageUrl} alt="Course Image" />
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
                                                <textarea className="bigit"
                                                    value={courseDetails.description}
                                                    onChange={(e) => setCourseDetail((prev) => ({ ...prev, description: e.target.value }))}
                                                />
                                            </li>
                                            <li className="list-group-item">
                                                <span className="titlesss">Requirements: </span>
                                                <textarea className="bigit"
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

                        {activeTab === "lessons" ? (
                            <>
                                <button type="button" className="add_lesson btn btn-success" onClick={handleAddLessonClick}>
                                    Add Lesson
                                </button>
                                {lessons.length > 0 ? (

                                    lessons.map((lesson, i) => (
                                        <form key={lesson._id}>
                                            <ul className="list-group list-group-flush" key={lesson._id}>
                                            
                                                <li className="list-group-item" >
                                                    <span className="titlesss">Lesson :{++i} </span>
                                                    <textarea
                                                        value={lesson.title}
                                                        style={{ color: "black" }}
                                                        onChange={(e) => {
                                                            {
                                                                const newTitle = e.target.value;
                                                                setLessons(prevLessons => prevLessons.map(lessonItem => {
                                                                    if (lessonItem._id === lesson._id) {
                                                                        return { ...lessonItem, title: newTitle };
                                                                    }
                                                                    return lessonItem;
                                                                }));
                                                        }}}
                                                    />
                                                </li>
                                                <li className="list-group-item">
                                                    <span className="titlesss">Video URL: </span>
                                                    <textarea
                                                        value={lesson.videoUrl}
                                                        onChange={(e) => {
                                                            {
                                                                const newValue = e.target.value;
                                                                setLessons(prevLessons => prevLessons.map(lessonItem => {
                                                                    if (lessonItem._id === lesson._id) {
                                                                        return { ...lessonItem, videoUrl: newValue };
                                                                    }
                                                                    return lessonItem;
                                                                }));
                                                            }
                                                        }}/>
                                                </li>
                                                <li className="list-group-item">
                                                    <span className="titlesss">Content: </span>
                                                    <textarea className="bigit" value={lesson.content}
                                                        onChange={(e) => {
                                                            {
                                                                const newValue = e.target.value;
                                                                setLessons(prevLessons => prevLessons.map(lessonItem => {
                                                                    if (lessonItem._id === lesson._id) {
                                                                        return { ...lessonItem, content: newValue };
                                                                    }
                                                                    return lessonItem;
                                                                }));
                                                            }
                                                        }}/>
                                                </li>
                                            </ul>
                                            <button type="button" className="edit_lesson btn btn-primary" onClick={() => handleSaveLessonDetails(lesson._id)}>
                                                Save Lesson Detail
                                            </button>
                                            <button type="button" className="delete_lesson btn btn-danger" onClick={() => handleDeleteLesson(lesson._id)}>
                                                Delete Lesson
                                            </button>
                                        </form>
                                    ))
                                ) : null}
                            </>
                        ) : null}
                    </div>
                </div>
            </div>

            <ToastContainer />
            <AddLessonModal isOpen={showModal} onClose={()=>setShowModal(false)} onAddLesson={handleAddLesson} courseId={courseId} />
        </>
    );
};

// }
export default CourseDetail;

