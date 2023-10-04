const Role = require('../models/role')
const User = require('../models/user')

const rolValido = async (rol='')=>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en BD`)
    }
}

const correoValido = async(correo='')=>{
    const existeCorreo = await User.findOne({correo})
    if(existeCorreo){
        throw new Error(`El correo ${correo} ya ha sido registrado`)
        
    }
}
const userPorIdValido = async(id)=>{
    const existeUser = await User.findById(id);
    if(!existeUser){
        throw new Error(`El id ${id} no existe`)
        
    }
}
 

module.exports = {
    rolValido,
    correoValido,
    userPorIdValido
}