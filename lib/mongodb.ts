import mongoose from 'mongoose';

const connection: {isConnected?: number }  = {};

async function dbConnect(){
  if (connection.isConnected) {
    return;
  }
  const db = await mongoose.connect(process.env.MONGODB_URI!);
  console.log('Connected to MongoDB');
  connection.isConnected = db.connections[0].readyState;
}


export default dbConnect;

//mongodb+srv://semasarmonaitis:Semas2001@clu}ster0.34dggy4.mongodb.net