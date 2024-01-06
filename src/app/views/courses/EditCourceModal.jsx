import React from 'react';
import { Modal, Button, Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import { IoCloseSharp } from "react-icons/io5";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { EditCource } from "../ApiBackend/ApiBackend";
import "./AddCourseModal.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';


const EditCourceModal = ({ isOpen, onClose, courseId, courseDetails, onCourseUpdated}) => {
  const formik = useFormik({
    initialValues: {
      title: courseDetails?.title || '',
      description: courseDetails?.description || '',
      instructor: courseDetails?.instructor || '',
      imageUrl: courseDetails?.imageUrl || '',
      requirements: courseDetails?.requirements || '',
      price: courseDetails?.price || '',
      duration: courseDetails?.duration || '',
      language: courseDetails?.language || '',
      subject: courseDetails?.subject || '',
      level: courseDetails?.level || '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
      instructor: Yup.string().required('Instructor is required'),
      imageUrl: Yup.string().required('ImageUrl is required'),
      requirements: Yup.string().required('Requirements are required'),
      price: Yup.number().required('Price is required'),
      duration: Yup.string().required('Duration is required'),
      language: Yup.string().required('Language is required'),
      subject: Yup.string().required('Subject is required'),
      level: Yup.string().required('Level is required'),
    }),
    
    onSubmit: async (values) => {
      if (!courseId) {
        console.error("Missing courseId for updateCourse");
        return; 
      }
      try {
        const res = await EditCource({ _id: courseId, values });
        console.log(res, ">>>>>>>>>>>>>>>>>>>>");
    
        if (res && res.message === 'updated successfully') {
          toast.success("Course updated successfully", {
            position: "top-center",
            autoClose: 2000,
            theme: "colored"
          });
          onCourseUpdated(courseId, values);
          onClose(); 
        } else {
          toast.error("Failed to update course", {
            position: "top-center",
            autoClose: 2000,
            theme: "colored"
          });
        }
      } catch (error) {
        console.error('Error updating course:', error);
        toast.error("Failed to update course", {
          position: "top-center",
          autoClose: 2000,
          theme: "colored"
        });
      }
    },
    
  });
  
  useEffect(() => {
    console.log("courseDetails===========", courseDetails)
    if (isOpen && courseDetails && courseDetails.length > 0) {
      const courseDetailsData = courseDetails[0]; // Access the first object in the array
      formik.setValues({
        title: courseDetailsData.title || '',
        description: courseDetailsData.description || '',
        instructor: courseDetailsData.instructor || '',
        imageUrl: courseDetailsData.imageUrl || '',
        requirements: courseDetailsData.requirements || '',
        price: courseDetailsData.price || '',
        duration: courseDetailsData.duration || '',
        language: courseDetailsData.language || '',
        subject: courseDetailsData.subject || '',
        level: courseDetailsData.level || '',
      });
      formik.setTouched({});
    }
  }, [isOpen, courseDetails]);
  

 

  return (
    <>
      <Modal show={isOpen} onHide={onClose} centered>
        <Modal.Header>
          <Modal.Title> Edit Course</Modal.Title>
          <IoCloseSharp onClick={onClose} style={{ cursor: 'pointer' }} />
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit} className='row'>
            <FormGroup className="mb-3 col-md-6">
              <FormLabel htmlFor="title">Title</FormLabel>
              <FormControl
                type="text"
                id="title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.title && formik.errors.title}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.title}
              </Form.Control.Feedback>
            </FormGroup>

            <FormGroup className="mb-3 col-md-6">
              <FormLabel htmlFor="description">Description</FormLabel>
              <FormControl
                as="textarea"
                id="description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.description && formik.errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.description}
              </Form.Control.Feedback>
            </FormGroup>

            <FormGroup className="mb-3">
              <FormLabel htmlFor="instructor">Instructor</FormLabel>
              <FormControl
                type="text"
                id="instructor"
                name="instructor"
                value={formik.values.instructor}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.instructor && formik.errors.instructor}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.instructor}
              </Form.Control.Feedback>
            </FormGroup>

            <FormGroup className="mb-3">
              <FormLabel htmlFor="imageUrl">Image URL</FormLabel>
              <FormControl
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={formik.values.imageUrl}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.imageUrl && formik.errors.imageUrl}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.imageUrl}
              </Form.Control.Feedback>
            </FormGroup>

            <FormGroup className="mb-3">
              <FormLabel htmlFor="requirements">Requirements</FormLabel>
              <FormControl
                type="text"
                id="requirements"
                name="requirements"
                value={formik.values.requirements}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.requirements && formik.errors.requirements}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.requirements}
              </Form.Control.Feedback>
            </FormGroup>

            <FormGroup className="mb-3">
              <FormLabel htmlFor="price">Price</FormLabel>
              <FormControl
                type="number"
                id="price"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.price && formik.errors.price}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.price}
              </Form.Control.Feedback>
            </FormGroup>

            <FormGroup className="mb-3">
              <FormLabel htmlFor="duration">Duration</FormLabel>
              <FormControl
                type="text"
                id="duration"
                name="duration"
                value={formik.values.duration}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.duration && formik.errors.duration}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.duration}
              </Form.Control.Feedback>
            </FormGroup>

            <FormGroup className="mb-3">
              <FormLabel htmlFor="language">Language</FormLabel>
              <FormControl
                type="text"
                id="language"
                name="language"
                value={formik.values.language}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.language && formik.errors.language}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.language}
              </Form.Control.Feedback>
            </FormGroup>

            <FormGroup className="mb-3">
              <FormLabel htmlFor="subject">Subject</FormLabel>
              <FormControl
                type="text"
                id="subject"
                name="subject"
                value={formik.values.subject}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.subject && formik.errors.subject}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.subject}
              </Form.Control.Feedback>
            </FormGroup>

            <FormGroup className="mb-3">
              <FormLabel htmlFor="level">Level</FormLabel>
              <FormControl
                type="text"
                id="level"
                name="level"
                value={formik.values.level}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.level && formik.errors.level}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.level}
              </Form.Control.Feedback>
            </FormGroup>

            <Modal.Footer>
              <Button className='submitt_course' type="submit">
                Save Details
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default EditCourceModal;
