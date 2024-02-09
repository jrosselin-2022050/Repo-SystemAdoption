'use strict'
import  express  from 'express'
import { actualizar, buscar, eliminar, nuevo } from "./animal.controller.js"

const api = express.Router()

api.post('/Nuevo', nuevo)
api.put('/Editar/:id', actualizar)
api.get('/Buscar', buscar)
api.delete('/Eliminar/:id', eliminar)

export default api