import Repository from "../repository/matchRepository";

export const createMatch = async (req, res) => {
  try {
    const response = await Repository.create({ data: req.body });
    // console.log("response1 ", response)
    return res.status(200).json(response._id);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const updateMatch = async (req, res) => {
  try {
    const response = await Repository.findOneAndUpdate(req.body);
    // console.log("response from service ", response);
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error updating match:", error);
    return res
      .status(500)
      .json({ error: "Unknown error occurred while updating match" });
  }
};


export const getMatch = async (req, res) => {
    try {
      const response = await Repository.findById(req.query.id);
      console.log("from service ", response)
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  };
