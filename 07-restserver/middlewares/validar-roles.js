const { request, response } = require("express")



const esAdminRole = (req=request,res=response,next) =>{

    if (!req.usuarioAuth) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin valdidar el token primero'
        })
    }

    const {rol,nombre} = req.usuarioAuth;

    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no es administrador - No puede hacer esto`
        });
    }
    next()
}

const tieneRole = (...roles) =>{ // ...roles guarda el resto de argumentos como un array
    return (req,res=response,next) => {
        if (!req.usuarioAuth) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin valdidar el token primero'
            })
        }

        if (!roles.includes(req.usuarioAuth.rol)) {
            return res.status(401).json({
                msg: ` El servicio quiere uno de estos roles ${roles}`
            })
        }

        next();

    }
}

module.exports = {
    esAdminRole,
    tieneRole
}