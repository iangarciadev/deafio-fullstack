import express from 'express'
import usersRoutes from './modules/users/users.routes'

const app = express()
app.use(express.json())

app.use('/users', usersRoutes)

app.listen(3000, () => {
  console.log('Servidor na porta 3000')
})