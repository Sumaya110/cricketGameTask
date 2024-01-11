import {
  createNewMatch,
  updateNewMatch,
  getNewMatch,
} from "@/libs/api_routes/routes"

async function createMatch(data) {
  try {
    const response = await createNewMatch(data);
    // console.log(response)
    return response.data;
  } catch (error) {
    throw Error(error.response.data);
  }
}

async function updateMatch(matchId, updatedData) {
  try {
    const response = await updateNewMatch({ matchId, updatedData });
    // console.log('Response from try:', response);

    if (response && response.data) {
      return response.data;
    } else {
      console.error('Invalid response format');
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('Error in updateMatch:', error);

    if (error.response) {
      console.error('Error response data:', error.response.data);
      throw new Error(error.response.data);
    } else {
      console.error('Unknown error occurred');
      throw new Error('Unknown error occurred'); // Fallback error message
    }
  }
}


async function getMatch(matchId) {

  // console.log("match idddd:::::  ",matchId)
  try {
    const response = await getNewMatch(matchId);
    
    console.log("get matchAction",response)
    return response.data;
  } catch (error) {
    throw Error(error.response.data);
  }
}



export { createMatch, updateMatch , getMatch};