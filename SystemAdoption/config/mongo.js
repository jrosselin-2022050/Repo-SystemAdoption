//Conexión a MongoDB
'use strict'

import mongoose from 'mongoose'

export const connect = async () => {
    try {
        mongoose.connection.on('error', () => {
            console.log('MongoDB | could not be connect to mongodb')
            mongoose.disconnect()
        })
        mongoose.connection.on('connecting', () => console.log('MongoDB | try connecting'))
        mongoose.connection.on('connected', () => console.log('MongoDB | connected to mogodb'))
        mongoose.connection.on('open', () => console.log('MongoDB | conneted to database'))
        mongoose.connection.on('disconnected', () => console.log('MongoDB |  disconneted'))
        mongoose.connection.on('reconnected', () => console.log('MongoDB | reconnected to mongodb'))


        return await mongoose.connect('mongodb://127.0.0.1:27017/AdoptionSystemAV2024')
    } catch (err) {
        console.error('DataBase connection failed', err)
    }
}