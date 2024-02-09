import mongoose, { Schema } from 'mongoose'

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    username:{
        type:String,
        required: true,
        lowercase:true,
        unique:true
    },
    password:{
        type: String,
        minLength:[8, 'Password must be 8 characters'],
        required: true
    },
    phone:{
        type: String,
        minLength:8,
        maxlength:8,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    role:{
        type:String,
        upppercase: true,
        enum:['ADMIN', 'CLIENT'],//Solo los datos que estan en el arreglo son validos
        required:true
    }


})

// pre mongoose
                            //plurarizar
export default mongoose.model('user', userSchema)