import express from "express";
import {configDotenv} from 'dotenv'

configDotenv({
    path:'.env'
});

const port = process.env.PORT;
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/ping/:name", (req, res) => {
  console.log(req.params.name);
  res.send(`pong ${req.params.name}`);
});

app.post('/post',(req,res)=>{
    res.send('post')
})

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is listening on port ${port}`);
});

/* HTTP Requests
    * GET
    * POST
    * PUT
    * DELETE
    * PATCH
    * OPTIONS
    


*/


