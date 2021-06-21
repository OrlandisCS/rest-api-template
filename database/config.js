require("colors");
const mongoose = require("mongoose");
const dbConection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("base de datos conectada".green);
  } catch (error) {
    console.log(error);
    throw new Error("Error al iniciar la base de datos");
  }
};

module.exports = {
  dbConection,
};
