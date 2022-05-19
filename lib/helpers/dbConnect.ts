import mongo from "mongoose";

const connection: { isConnected?: mongo.ConnectionStates } = {};

const dbConnect = async () => {
  if (connection.isConnected) {
    return;
  }

  const db = await mongo.connect(process.env.MONGO_URI as string);

  connection.isConnected = db.connections[0].readyState;

  console.log(connection.isConnected);
};

export default dbConnect;
