import axios from "axios";
import { Base_url } from "./BaseUrl";

export const LoginApi= async(values)=>{
    try {
      console.log("OKOKOK",values)
      const response = await axios.post(`${Base_url}/user/login`, values, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('API response:', response);
      return response.data; 
    } catch (error) {
      console.log("EEE", error)
      throw error;
    }
  }

  export const AllCourses= async(values)=>{
    try {
      const response = await axios.get(`${Base_url}/user/allCourses`, values, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('API response:', response);
      return response.data; 
    } catch (error) {
      console.log("EEE", error)
      throw error;
    }
  }

  export const AddCource= async(values)=>{
    const { title, description, instructor ,imageUrl,duration,language,level,price,requirements,subject} = values;
    try {
      const resp = await fetch(`${Base_url}/user/addCourse`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({  
          title,
          description,
          instructor,
          imageUrl,
          duration,
          language,
          level,
          price,
          requirements,
          subject
        }),
      });
      const data = await resp.json();
         console.log("AddCourse is added successfully:", data);
         return data
    } catch (error) {
      throw error;
      
    }
  }

  export const DeleteCourse = async (_id) => {
    console.log("iam inn");
    try {
      const response = await axios.delete(`${Base_url}/user/deleteCourse/${_id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('API response:', response);
      return response.data; 
    } catch (error) {
      console.log("EEE", error);
      throw error;
    }
  }
  export const getCourse = async (_id) => {
    console.log("iam inn");
    try {
      const response = await axios.get(`${Base_url}/user/getCourse/${_id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('API response:', response);
      return response.data; 
    } catch (error) {
      console.log("EEE", error);
      throw error;
    }
  }


  export const EditCource = async ({_id,values}) => {
    console.log(values,"reqqqqqqq");
    console.log("iam inn");
    try {
      const response = await axios.post(`${Base_url}/user/updateCourse/${_id}`,values, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('API response:', response);
      return response.data; 
    } catch (error) {
      console.log("EEE", error);
      throw error;
    }
  }
  