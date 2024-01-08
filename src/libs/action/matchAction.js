import {
  createNewMatch,
} from "@/libs/api_routes/routes"

async function createMatch(data){
  try{
    const response = await createNewMatch(data);
    return response.data;
  }catch(error){
    throw new Error(error.response.data);
  }
}

export {createMatch, }
