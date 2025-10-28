import 'dotenv/config'
import express from "express"
import { Response, Request, NextFunction } from 'express'
import * as controllers from './Modules/controller.index'
import { dbConnection } from './DB/db.connection'
const app = express()
app.use(express.json())
dbConnection()
console.log(process.env.USER_EMAIL);
console.log(process.env.USER_PASSWORD);



app.get('/', (_req :Request, res : Response) => {
  res.json("Hello,wold")
})

app.use('/api/auth', controllers.AuthController)

app.use((err: Error | null, _req: Request, res: Response, _next: NextFunction) => {
  const status = 500
  const message = "Something went Wrong"
  res.status(status).json({ message: err?.message || message })
});
const PORT: number | string = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
})