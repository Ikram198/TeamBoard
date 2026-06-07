import app from './app.js';
import dotenv from 'dotenv';
import connectDB from './db/index.js';
import APIError from './utils/API-error.js';

dotenv.config({
    path: './.env'
});
connectDB().
then(
  console.log("db connected ")
).
catch(
  APIError(500, "Error in db connection"),
  console.log("error in db connection", error)
)


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});