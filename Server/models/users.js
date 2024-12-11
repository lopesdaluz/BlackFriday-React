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

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", UserSchema);
