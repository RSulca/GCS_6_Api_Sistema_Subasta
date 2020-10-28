const { response, request } = require('express');
const User = require('../models/user.model');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

const uploadPhoto = async(req = request, res = response) => {
    const id = req.params.id;
    const user = await User.findById(id);
    let url = "";
    try {
        if (!user) {
            return res.status(400).json({
                ok: false,
                message: 'User does not exist.'
            });
        }
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                ok: false,
                message: 'No files were uploaded.'
            });
        }
        const photo = req.files.photo;
        const clean_name = photo.name.split('.');
        const extension = clean_name[clean_name.length - 1];
        const extensions_valids = ['jpg', 'png', 'jpeg', 'gif'];
        if (!extensions_valids.includes(extension)) {
            return res.status(400).json({
                ok: false,
                message: 'Extension no valid.'
            })
        }

        const pathName = `./src/upload/${photo.name}`;
        photo.mv(pathName, async(err) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            await cloudinary.uploader.upload(pathName, async(error, result) => {
                if (error) {
                    return res.status(500).json({
                        ok: false,
                        error
                    })
                }
                url = result.url;
                await User.findByIdAndUpdate(id, { img: result.url })
            });

            if (fs.existsSync(pathName)) {
                fs.unlinkSync(pathName)
            }

            return res.status(200).json({
                ok: true,
                message: 'File updated.',
                data: url
            })

        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Error, please check logs.'
        })
    }
}

module.exports = {
    uploadPhoto
}