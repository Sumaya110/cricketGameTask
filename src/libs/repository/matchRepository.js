import Match from "../models/matchModel";

const create = async({data}) => {
//    console.log("data dekhao : ", data)
   const response = await Match.create(data)
   return response;
}



const findOneAndUpdate = async (updateData) => {
    // console.log("ffff", updateData);
    const response = await Match.findOneAndUpdate(
      { _id: updateData.matchId }, // Use an object with the key "_id" to represent the matchId
      updateData.updatedData, // Assuming updateData has an 'updatedData' property
      { new: true } // To return the updated document
    );
    return response;
  };



  const findById = async (id) => {
    console.log("idddd  :", id)
    const response = await Match.findById(id);
    return response;
  };


const Repository = {
    create, findOneAndUpdate,findById,
}

export default Repository
