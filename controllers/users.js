const { response, request } = require("express");
const bcrypts = require("bcryptjs");

const User = require("../models/user");

const usersGet = async (req, res) => {
  //const {q, nombre, apikey} = req.query
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };
//   const users = await User.find(query).skip(desde).limit(Number(limite));
//   const total = await User.countDocuments(query);

  const [total,users] = await Promise.all([
    User.countDocuments(query),
    User.find(query)
        .skip(desde)
        .limit(Number(limite)),
  ]);
  res.json({
    total,
    users
  });
};
const usersPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const user = new User({ nombre, correo, password, rol });

  const salt = bcrypts.genSaltSync();
  user.password = bcrypts.hashSync(password, salt);
  await user.save();
  res.json({
    msg: "post API - controlador",
    user,
  });
};

const usersPut = async (req, res) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;
  if (password) {
    const salt = bcrypts.genSaltSync();
    resto.password = bcrypts.hashSync(password, salt);
  }

  const userBD = await User.findByIdAndUpdate(id, resto);
  res.status(200).json(userBD);
};

const usersDelete = async(req, res) => {
 const {id} = req.params;

 const user = await User.findByIdAndUpdate(id, {estado:false})
  res.json({
    user
  });
};

const usersPatch = (req, res) => {
  res.json({
    msg: "patch API - controlador",
  });
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
  usersPatch,
};
