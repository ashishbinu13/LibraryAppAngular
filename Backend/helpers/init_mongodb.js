const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((error) => {
    console.log(error.message);
  });

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to db");
});

mongoose.connection.on("error", (err) => {
  console.log(err.message);
});

mongoose.connection.on("diconnected", () => {
  console.log("Mongoose disconnected");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});
