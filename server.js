const app = require("./index")
const connectDb = require("./src/database/database")
require("dotenv").config()
const port = process.env.PORT

app.listen(port, async()=>{
    console.log(`Server run successfully at http://localhost:${port}`);
     await connectDb()
})

// postman documentation

//https://documenter.getpostman.com/view/25916567/2s9YR9XsUc // postman documentation



















