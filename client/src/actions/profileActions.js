import axios from "axios"
import {GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS, SET_CURRENT_USER } from "./types"

//get current profile
export const getCurrentProfile = () => dispatch=> {
  dispatch(setProfileLoading());
  axios.get("/api/profile")
    .then(res => dispatch({
      type: GET_PROFILE,
      payload: res.data
    }))
    .catch(err=> dispatch({
      type: GET_PROFILE,
      payload: {}
    }))
}

//create profile
export const createProfile = (profileData, thisPropsHistory) => dispatch =>{
  axios.post("/api/profile", profileData)
    .then(res => thisPropsHistory.push("/dashboard"))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

//Add experience
export const addExperience = (expData, thisPropsHistory) => dispatch =>{
  axios.post("/api/profile/experience", expData)
    .then(res=> thisPropsHistory.push("/dashboard"))
    .catch(err=>dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

//Add education
export const addEducation = (eduData, thisPropsHistory) => dispatch =>{
  axios.post("/api/profile/education", eduData)
    .then(res=> thisPropsHistory.push("/dashboard"))
    .catch(err=>dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

//DELETE account and profile
export const deleteAccount = () => dispatch =>{
  if(window.confirm("Are you sure you want to delete account?")){
    axios.delete("/api/profile")
      .then(res => dispatch({
        type: SET_CURRENT_USER,
        payload: {}
      }))
      .catch(err=> dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }))
  }
}

//Profile loading
export const setProfileLoading = () =>{
  return {
    type: PROFILE_LOADING
  }
}
//Profile loading
export const clearCurrentProfile = () =>{
  return {
    type: CLEAR_CURRENT_PROFILE
  }
}