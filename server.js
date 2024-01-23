import express from "express";
const app = express();
//const PORT = parseInt(process.env.PORT, 10); // IMPORTANT!! You HAVE to use this environment variable as port!
const PORT = 80;
app.use(express.static("dist"));

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));