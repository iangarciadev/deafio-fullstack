import express from 'express'
import cors from 'cors'
import usersRoutes from './modules/users/users.routes'
import clientsRoutes from './modules/clients/clients.routes'
import tasksRoutes from './modules/tasks/tasks.routes'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/users', usersRoutes)
app.use('/clients', clientsRoutes)
app.use('/tasks', tasksRoutes)

app.listen(3000, () => {
  console.log('Servidor na porta 3000')
})