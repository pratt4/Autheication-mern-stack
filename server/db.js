import mongoose from "mongoose";

export default function fun(){
  const connectionParams={
  useNewUrlParser:true,
  useUnifiedTopology:true}


try {
  mongoose.connect(process.env.db, connectionParams);
  console.log("connected to mongoDB")
} catch (error) {
  console.log(error)
  
}
};