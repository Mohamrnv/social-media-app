import 'dotenv/config'
import express from "express"
import { Response, Request, NextFunction } from 'express'
import * as controllers from './Modules/controller.index'
import { dbConnection } from './DB/db.connection'
import { HttpException } from './utils'
const app = express()
app.use(express.json())
dbConnection()
console.log(process.env.USER_EMAIL);
console.log(process.env.USER_PASSWORD);



app.get('/', (_req: Request, res: Response) => {
  res.json("Hello,wold")
})

app.use('/api/auth', controllers.AuthController)
app.use('/api/user',controllers.profileController)
app.use((err: HttpException | null, _req: Request, res: Response, _next: NextFunction) => {
  if (err) {
    if (err instanceof HttpException) {
      res.status(err?.statuscode).json({ message: err.message, error: err.error })
    }
    else{
      res.status(500).json({message:"something went wrong"})
    }
  }
});
const PORT: number | string = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
})