import { asyncHandler } from "../utils/Async-Handler.js";

const healthcheck = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Health check passed!" });
});

export { healthcheck };