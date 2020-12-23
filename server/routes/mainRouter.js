const express = require('express')
const { Pool } = require('pg')
const router = express.Router()

const { pool } = require('../db')

router.get('/', async (req, res) => {
	try {
		const response = await pool.query('SELECT * FROM todos')
		res.status(200).json(response.rows)
	} catch (err) {
		console.log(err.message)
	}
})

router.post('/', async (req, res) => {
	try {
		if(req.body.body !== '') {
			const response = await pool.query(
				'INSERT INTO todos(body) VALUES ($1) RETURNING *',
				[req.body.body]
			)
			console.log(req.body.body)
			res.status(201).json(response.rows[0])
		}
	} catch (err) {
		console.log(err.message)
	}
})

router.delete('/:id', async (req, res) => {
	try {
		await pool.query('DELETE FROM todos WHERE id=$1 returning *', [
			req.params.id,
		])
		res.status(204).json({ msg:'Successfully Deleted'})
		console.log('Successfully deleted')
	} catch (err) {
		console.log(err.message)
	}
})

router.patch('/:id', async (req, res) => {
	try {
		const response = await pool.query('UPDATE todos SET body=$1 WHERE id=$2', [
			req.body.body,
			req.params.id,
		])
		res.status(200).json(response.rows[0])
	} catch (err) {
		console.log(err.message)
	}
})

module.exports = router
