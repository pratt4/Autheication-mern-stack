import express  from "express";
import dotenv from "dotenv"
import cors from "cors"
import connection from "./db.js"

import userRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"


dotenv.config();

const app=express()


connection();


app.use(express.json())
app.use(cors())

app.use("/api/users",userRoutes)
app.use("/api/auth",authRoutes)

const port = process.env.PORT || 8080

app.listen(port, ()=>{
  console.log(`listening to the ${port}...`)
  // console.log(process.env.privatekey)
})