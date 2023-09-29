const {response, request} =require('express')

const usersGet = (req, res)=> {
    const {q, nombre, apikey} = req.query
    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey
    });
}
const usersPost = (req, res= response)=> {
    const {nombre, edad} = req.body;
    res.json({
        msg: 'post API - controlador',
        nombre,
        edad
    });
}

const usersPut = (req, res)=> {
    const id = req.params.id;
    res.status(400).json({
        msg: 'put API - controlador',
        id
    });
}

const usersDelete = (req, res)=> {
    res.json({
        msg: 'delete API - controlador'
    });
}

const usersPatch = (req, res)=> {
    res.json({
        msg: 'patch API - controlador'
    });
}

module.exports= {
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
    usersPatch
}