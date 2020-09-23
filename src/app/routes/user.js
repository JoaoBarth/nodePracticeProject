const express = require('express')
const User = require('../../models/user')
const router = new express.Router()
const auth = require('../../middleware/auth')

const sharp = require('sharp')
const multer = require('multer')

const upload = multer({
    limits: {
        fileSize: 2000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpeg|jpg|png)$/)){
            return cb(new Error('Invalid format.'))
        }

        cb(undefined, true)
    }
})

router.post('/users', async (req,res) => {
    const user = new User(req.body)
    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    }catch(e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req,res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch(e){
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req,res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) =>{
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch(e){
        res.status(500).send()
    }
})

router.post('/users/logout/all', auth, async (req,res) => {
    try{
        req.user.tokens = []
        await req.user.save()

        res.send()  
    } catch(e){
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req,res) => {
    res.send(req.user)    
})

router.patch('/users/me', auth, async (req, res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid update'})
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    }catch(e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth, async (req,res) =>{
    const _id = req.user._id
    
    try {
        await req.user.remove()
        res.send(req.user)
    }catch(e) {
        res.status(500).send()
    }
})

router.get('/users/:id/avatar', async (req,res) =>{
    try {
        const user = await User.findById(req.params.id)

        if(!user || !user.avatar){
            throw new Error()
        }
        res.set('Content-Type', 'image/png')

        res.send(user.avatar)

    }catch(e) {
        res.status(404).send()
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req,res) => {
    
    const buffer = await sharp(req.file.buffer).resize({width: 250, heigth: 250}).png().toBuffer()
    req.user.avatar = buffer

    await req.user.save()
    res.send()
}, (error, req, res, next) =>{
    res.status(400).send({ error: error.message })
})

module.exports = router