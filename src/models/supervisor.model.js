const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    nombres: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    dni: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: false
    },
    especialidad: {
        type: String,
        required: false
    },
    categoria: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        default: 'A',
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true,
        default: "SUPERVISOR_ROLE"
    },

});

module.exports = model('supervisor', supervisorSchema);