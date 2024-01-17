import React, { useEffect, useState } from 'react';
import "./index.css";
import { AllCourses, DeleteCourse } from "../ApiBackend/ApiBackend";
import AddCourseModal from "./AddCourseModal";
import EditCourceModal from "./EditCourceModal";
import { ToastContainer, toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { getCourse } from "../ApiBackend/ApiBackend"
import Loading from 'app/components/MatxLoading';
import { useSelector } from 'react-redux';



const MyCourses = () => {
  const token= useSelector((state) => state.authToken);
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCourseId, setEditCourseId] = useState(null);
  const [editCourseDetails, setEditCourseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandState, setExpandState] = useState(null);
  const [search, setSearch] = useState("");
  const [courseAdded, setCourseAdded] = useState(false);

 

  // console.log(courses, " cources");
  
  const handleExpand = (index) => {
    setExpandState((prevIndex) => (prevIndex === index ? null : index));
  }

  const handleAddCourseClick = () => {
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
  }

  const handleEdit = async (_id) => {
    try {

      // window.location.href(`/courses/${courseDetails._id}`);
      const courseDetails = await fetchCourseDetails(_id);
      // console.log(courseDetails,"courseDetails");
     
      setEditCourseId(_id);
      setEditCourseDetails([courseDetails.course]);
      setShowEditModal(true);
    } catch (error) {
      console.error('Error fetching course details:', error);
    }
  };
  const handleCourseUpdated = (courseId, updatedValues) => {
    setCourses(prevCourses => prevCourses.map(course => course._id === courseId ? {
      ...course,
      ...updatedValues
    } : course));
  };
  
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditCourseId(null);
    setEditCourseDetails(null);
  }

  const handleDelete = async (_id) => {
    try {
      toast.info(
        <div>
          <p>Are you sure you want to delete this course?</p>
          <button className="toast_btn" onClick={() => handleConfirmDelete(_id)}>Yes</button>
          <button className='toast_btn' onClick={handleCancelDelete}>No</button>
        </div>,
        { autoClose: false }
      );
    } catch (error) {
      console.error('Error initiating delete:', error);
    }
  };

  const handleConfirmDelete = async (_id) => {
    try {
      toast.dismiss();
      const deletedCourse = await DeleteCourse(token,_id);
      // console.log(deletedCourse, "deletedCourse>>>>>>>>>>>>>>");
  
      setCourses((prevCourses) => prevCourses.filter((course) => course._id !== _id));
  
      toast.success("Course Deleted Successfully", {
        position: "top-center",
        autoClose: 2000,
        theme: "colored"
      });
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleCancelDelete = () => {
    toast.dismiss();
  };

  const handleAddCourse = async () => {
    try {
      const response = await AllCourses(token);
      console.log(response);
      setCourses(response);
      // handleCloseModal();
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AllCourses(token);
        // console.log("responseeeeeeee",response);
        if (Array.isArray(response?.courses)) {
          setCourses(response.courses);
          setLoading(false)
        } else {
          console.error('Invalid response structure:', response);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchData();
  }, [showModal, showEditModal]);

  const fetchCourseDetails = async (_id) => {
    try {
      const response = await getCourse(token,_id);
      // console.log(response, "get >>>>>>>>>>>>>>>");
      return response;
    } catch (error) {
      console.error('Error fetching course details:', error);
      throw error;
    }
  };
   
  if (loading) {
    return <div className="loader"><Loading/></div>; 
  }

  return (
    <>
      <div className='courses_top'>
        <h2>My Courses</h2>
         <div className="search-filter">
            
          <form className="d-flex" role="search" onSubmit={(e) => {
            e.preventDefault();
          }
          }
          >
        <input className="form-control me-2" type="search" value={search}
                onChange={(e) => setSearch(e.target.value)} placeholder="Search Course" aria-label="Search"/>
       
      </form>
            </div>
        <button onClick={handleAddCourseClick}>Add courses</button>
      </div>

      <table className="courses-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Title</th>
            <th>Description</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {courses?.filter((e) => {
            return e.title.toLowerCase().includes(search.toLowerCase())
          }).map((course, index) => (
            
            <tr key={course._id}>
              {/* { console.log("Coursetitleeee",course.title)} */}
              <td>{index + 1}</td>
              <td>
                <NavLink to={`/courses/${course._id}`}>
                 {course?.title}

                </NavLink>
              
              </td>
              <td onClick={() => handleExpand(index)}>
                 {course?.description.length > 40 ? (
                  <>
                    {expandState === index ? (
                      <span>{course?.description}</span>
                    ) : (
                      <>
                        {course?.description.slice(0, 40)}
                        <span className="expand-dots" >
                          {' '}
                          ...
                        </span>
                      </>
                    )}
                  </>
                ) : (
                  course?.description
                )}
              </td>
              <td>
                <div className="operations-cell">
              {/* <button className="edit-btn" onClick={() => handleEdit(course?._id)}>Edit</button> */}
                  <button className="delete-btn" onClick={() => handleDelete(course?._id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
      {/* <EditCourceModal 
           isOpen={showEditModal}
           onClose={handleCloseEditModal}
           courseId={editCourseId}
           courseDetails={editCourseDetails}
           onCourseUpdated={handleCourseUpdated} 
           /> */}
      <AddCourseModal isOpen={showModal} onClose={handleCloseModal} onAddCourse={() => { setCourseAdded(true); handleAddCourse() }} />
      <ToastContainer/>
    </>
  );
}

export default MyCourses;
