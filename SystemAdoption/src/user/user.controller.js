'use strict'

import User from './user.model.js' //unico que puede ir en mayuscula
import { encrypt, checkPassword, checkUpdate } from '../utils/validator.js'
import { hash } from 'bcrypt'

export const test = (req, res) => {
    return res.send('hello World')
}

export const register = async (req, res) => {
    try {
        //Capturar la informacion del cliente (body)
        let data = req.body;
        console.log(data)
        //Encriptar la contraseña
        data.password = await encrypt(data.password)
        //asignar el rol por defecto
        data.role = 'CLIENT' // si viene con otro valor o no viene, lo asigna a role Clinete
        // crear una instancia del modelo (schema)
        let user = new User(data)

        //Guardar la informacion
        await user.save()
        //respuesta al usuario
        return res.send({ message: 'Registered successfully' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error registering user', err })
    }
}

export const login = async (req, res) => {
    try {
        // capturar la informacion (body)
        let { username, password } = req.body
        // validar que el usuario exista
        let user = await User.findOne({ username })
        // velidar la contraseña que consida
        if (user && await checkPassword(password, user.password)) {
            let loggedUser = {
                username: user.username,
                name: user.name,
                role: user.role
            }
            //responder que si da acceso
            return res.send({ message: `Welcome ${user.name}`, loggedUser })

        }
        return register.status(404).send({ message: 'Invalid credentials' })


    } catch (err) {
        console.error(err)
        return err.status(500).send({ message: 'Failed to login' })
    }
}

export const update = async (req, res) => {// Usuarios logeados

    try {
        //Obtener el id del usuario a actualizar
        let { id } = req.params
        //Obtener los datos que actualizaremos
        let data = req.body
        //Validar si trae datos a actualizar
        let update = checkUpdate(data, id)
        if (!update) return res.status(400).send({ message: 'Have sumbmit some data that cannot be update or missing data' })
        //Validar si tiene permisos para actualizar(Tokenizacion)

        // Actualizamos en la Bd
        let updatedUser = await User.findOneAndUpdate(
            { _id: id },
            data,
            { new: true })

        // Validar actualizacion    
        if (!updatedUser) return res.status(401).send({ message: 'User not found and not update' })

        //Responder con el dato actualizado
        return res.send({ message: 'Update user', updatedUser })

    } catch (err) {
        console.error(err)
        if(err.keyValue.username) return res.status(400).send({message:`Username ${err.keyValue.username} is alredy taken`})
        return res.status(500).send({ message: 'Error updating account' })
    }
}

export const deleteU = async(req, res)=>{
    try{
        //Obtener el id
        let {id} = req.params
        // Validar si etsa logeado y es el mismo

        //Eliminar(deleteOne/findOneDelete)
        let deletedUser = await User.findOneAndDelete({_id: id})
        //Verificar que se elimino
        if(!deletedUser) return res.status(404).send({message:'Account not found and not delete'})

        // Responder
        return res.send({message:`Account whit username ${deletedUser.username} deleted successfully`})

    }catch(err){
        console.error(err)
        return res.status(500).send({message:'Error deleting account'})
    }
}
