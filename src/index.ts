import express, { Request, Response } from 'express'
import cors from 'cors'
import 'dotenv/config'

import { MongoClient } from 'mongodb'

const app = express()

app.use(cors())
app.use(express.json())

const client = new MongoClient(process.env.MONGO_URI as string)
const db = client.db('my-form-database')

const customers = db.collection('customers')

app.get('/', (req: Request, res: Response) => {
	res.json({ greeting: 'Hello world!' })
})

app.post('/', async (req: Request, res: Response) => {
	console.log('req from frontend -> ', req.body)

	const newCustomer = await customers.insertOne(req.body)

	const allCustomers = await customers.find().toArray()

	res.status(200).send(allCustomers)
})

app.listen(process.env.PORT, () => console.log('api listening on ', process.env.PORT))
