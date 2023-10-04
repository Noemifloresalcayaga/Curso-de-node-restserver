const {Router} = require('express');
const { usersGet, usersPost, usersPut, usersDelete, usersPatch } = require('../controllers/users');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { rolValido, correoValido, userPorIdValido } = require('../helpers/db-validators');


const router = Router();

router.get('/', usersGet);
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe contener más de 6 carácteres').isLength({min:6}),
    check('correo', 'El correo ingresado no es valido').isEmail(),
    //check('rol', 'El rol ingresado no es valido').isIn(['ADMIN ROLE', 'USER_ROLE']),
    check('rol').custom(rolValido),
    check('correo').custom(correoValido),
    validarCampos

],usersPost);
router.put('/:id',[
     check('id', 'No es un id valido').isMongoId(),
     check('id').custom(userPorIdValido),
     check('rol').custom(rolValido),

     validarCampos

],usersPut);
router.delete('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(userPorIdValido),
    validarCampos,
],usersDelete)
router.patch('/', usersPatch)
module.exports= router