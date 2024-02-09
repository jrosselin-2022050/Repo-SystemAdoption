import mongoose, { Schema } from 'mongoose';

const animalSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    edad: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    fecha: {
        type: String,
        required: true
    }

})

export default mongoose.model('animal', animalSchema)