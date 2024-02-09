'use strict'
import Animal from './animal.model.js'

export const nuevo = async (req, res) => {
    try {
        let data = req.body;
        console.log(data)
        let pet = new Animal(data)
        await pet.save()
        return res.send({ message: 'Guardado' })

    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error al agregar el animal' })
    }
}

export const buscar =async (req, res) =>{
    try{
        let {nombre} = req.body
        let buscarAni = await Animal.find({_nombre: nombre})  
        if(!buscarAni) return res.status(404).send({message:'Animal no encrontrado'})
       
        
    }catch(err){
        console.error(err)
        return res.status(500).send({ message: 'Error en base de datos' })

    }

}

export const actualizar = async(req, res)=>{
    try{    
        let{id} = req.params
        let data = req.body
        let updateAni = await Animal.findOneAndUpdate({_id: id},
            data,
            {new: true})
            if(!updateAni)return res.status(401).send({message:'No se pudo actualizar correctamente'})
            return res.send({message:'Actualizado', updateAni})

    }catch(err){
        console.error(err)
        return res.status(500).send({message:'Error al actualizar'})
    }
}

export const eliminar = async(req, res)=>{
    try{
        let {id} = req.params
        let eliminarAni = await Animal.findOneAndDelete({_id: id})
        if(!eliminarAni) return res.status(404).send({message:'Animal no eliminado'})
        return res.send({message: `Animal con el nombre ${eliminarAni.nombre} se elimino`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message:'Error al eliminar'})
    }
}