import commonAPI from "./commonAPI";
import SERVER_URL from "./serverURL";


// register api called by the auth component 
export const registerAPI = async (reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/register`,reqBody)
}

export const loginAPI = async (reqBody)=>{
   return await commonAPI("POST",`${SERVER_URL}/login`,reqBody)
}


//ADD PROJECT CALLED BY AUTH COMPONENT WHEN USER CLICKED ON LOGIC BUTTON
export const addProjectAPI = async (reqBody,reqHeader)=>{
   return await commonAPI("POST",`${SERVER_URL}/add-project`,reqBody,reqHeader)
}

//getHome Project Api called by home component when page located in browser
export const getHomeProjectAPI = async ()=>{
   return await commonAPI("GET",`${SERVER_URL}/home-project`,{})
}

//getHome Project Api called by home component when page located in browser
export const allProjectAPI = async (searchKey,reqHeader)=>{
   return await commonAPI("GET",`${SERVER_URL}/all-project?search=${searchKey}`,{},reqHeader)
}


//get user project  Api called by view component when page located in browser
export const userProjectAPI = async (reqHeader)=>{
   return await commonAPI("GET",`${SERVER_URL}/user-project`,{},reqHeader)
}


//updateproject called by edit component when user clicked on edit button (useffect)

export const updateProjectAPI = async (id,reqBody,reqHeader)=>{
   return await commonAPI("PUT",`${SERVER_URL}/project/${id}/edit`,reqBody,reqHeader)
}

//updateproject called by edit component when user clicked on edit button (useffect)

export const removeUserProjectAPI = async (id,reqHeader)=>{
   return await commonAPI("DELETE",`${SERVER_URL}/projects/${id}/remove`,{},reqHeader)
}

//updateproject called by profile component when user clicked on edit button (useffect)

export const updateUserAPI = async (reqBody,reqHeader)=>{
   return await commonAPI("PUT",`${SERVER_URL}/edit-user`,reqBody,reqHeader)
}
