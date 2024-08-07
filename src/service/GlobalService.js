import axios from "axios"

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY

const axiosClient = axios.create({
    baseURL:import.meta.env.VITE_BASE_URL,
    headers:{
        'Content-Type':'application/json',

        'Authorization': `Bearer ${API_KEY}`

    }
})

const createNewResume = (data)=> axiosClient.post('/api/user-resumes', data)

const getUserResumes  = (userEmail)=> axiosClient.get('/api/user-resumes?filters[userEmail][$eq]='+userEmail) 

const updateResumeDetails = (id, data)=> axiosClient.put('/api/user-resumes/'+ id, data )

const getResumeById = (id)=>axiosClient.get('/api/user-resumes/'+ id + "?populate=*")

const deleteResumeById = (id)=>axiosClient.delete('/api/user-resumes/'+ id )

export default{
    createNewResume,
    getUserResumes,
    updateResumeDetails,
    getResumeById,
    deleteResumeById

}