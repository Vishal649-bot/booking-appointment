const express = require('express')
    router = express.Router()

const db = require('../db')

router.get('/',(req,res)=>{
    db.query('select * from users')
        .then(data => res.send(data[0]))
        .catch(err => console.log(err))
})

router.get('/:id',(req,res)=>{
    let id = req.params.id
    db.query('select * from users WHERE id ='+ id)
        .then(data => res.send(data[0]))
        .catch(err => console.log(err))
})

router.delete('/:id',(req,res)=>{
    let id = req.params.id
    db.query('DELETE FROM users WHERE id = ?', [id])
        .then(data => {
            res.send('deleted successfully')
            res.send(data)
            console.log(data);
        })
        .catch(err => console.log(err))
})

module.exports = router