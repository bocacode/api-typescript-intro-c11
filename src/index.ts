import express from 'express'
import cors from 'cors'
import 'dotenv/config'
//@ts-ignore
import { MongoClient } from 'mongodb'

const app = express()

app.use(cors())
app.use(express.json())

const client = new MongoClient(process.env.MONGO_URI)
const db = client.db('my-form-database')

const customers = db.collection('customers')

app.post('/', async (req, res) => {
	console.log('req from frontend -> ', req.body)

	const newCustomer = await customers.insertOne(req.body)

	const allCustomers = await customers.find().toArray()

	res.status(200).send(allCustomers)
})

app.listen(process.env.PORT, () => console.log('api listening on ', process.env.PORT))
