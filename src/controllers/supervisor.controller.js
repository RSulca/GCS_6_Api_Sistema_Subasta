const { response, request } = require('express');
const User = require('../models/user.model');

const actualizar = async(req = request, res = response) => {
  const id = req.params.id;
  try{
    const supervisor = await User.findById(id);
    if (!supervisor) {
        return res.status(404).json({
            ok: false,
            message: 'Supervisor no existe.'
        })
    } else {
        await User.findByIdAndUpdate(id, req.body, { new: true }, function(err, supervisor_actualizado){
        if(!err) {
          return res.status(200).json({
            ok: true,
            user: supervisor_actualizado
          })
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
        ok: false,
        message: 'Error al actualizar.'
    })
  }
}

const obtener = async(req = request, res = response) => {
  const id = req.params.id;
  try{
    await User.findById(req.params.id, function(err, supervisor) {
      if(!err) {
        return res.status(200).json({
          ok: true,
          user: supervisor
        })
      }
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
        ok: false,
        message: 'Error al obtener datos.' 
    })
  }
}

const listar = async(req = request, res = response) => {
  try{
    await User.find({}, function(err, supervisor) {
      if(!err) {
        return res.status(200).json({
          ok: true,
          user: supervisor
        })
      }
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
        ok: false,
        message: 'Error al obtener datos.'
    })
  }
}

const eliminar = async(req = request, res = response) => {
  const id = req.params.id;
  try{
    const supervisor = await User.findById(id);
    if (!supervisor) {
        return res.status(404).json({
            ok: false,
            message: 'Supervisor no existe.'
        })
    } else {
      await User.findByIdAndUpdate(id, {estado: false}, { new: true }, function(err, supervisor_actualizado){
        if(!err) {
          return res.status(200).json({
            ok: true,
            user: supervisor_actualizado
          })
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
        ok: false,
        message: 'Error al obtener datos.'
    })
  }
}
