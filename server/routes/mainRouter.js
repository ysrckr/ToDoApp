const express = require('express')
const { Pool } = require('pg')
const router = express.Router()

const { pool } = require('../db')

router.get('/', async (req, res) => {
	try {
		const response = await pool.query('SELECT * FROM todos')
		console.log(response.rows)
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err.message)
	}
})

router.post('/', async (req, res) => {
	try {
		const response = await pool.query(
			'INSERT INTO todos(body) VALUES ($1) RETURNING *',
			[req.body.body]
		)
		res.status(201).send(response.rows)
	} catch (err) {
		console.log(err.message)
	}
})

router.delete('/:id', async (req, res) => {
	try {
		await pool.query('DELETE FROM todos WHERE id=$1', [req.params.id])
		res.status(204)
		console.log('Successfully deleted')
	} catch (err) {
		console.log(err.message)
	}
})

module.exports = router
