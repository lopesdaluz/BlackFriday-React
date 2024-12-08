// // module.exports = (sequelize, DataTypes) => {
// //   const Users = sequelize.define("Users", {
// //     username: {
// //       type: DataTypes.STRING,
// //       allowNull: false,
// //     },
// //     password: {
// //       type: DataTypes.STRING,
// //       allowNull: false,
// //     },
// //   });

// //   return Users;
// // };
// module.exports = (sequelize, DataTypes) => {
//   const Users = sequelize.define("User", {
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     lastname: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     username: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   });
//   return Users;
// };

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  email: String,
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
