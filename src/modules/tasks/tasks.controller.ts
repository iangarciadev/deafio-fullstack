import { Request, Response } from 'express'
import prisma from '../../prisma'

// Cria uma nova tarefa associada a um cliente específico.
// Valida se o cliente pertence ao usuário autenticado.
export async function createTask(req: Request, res: Response) {
  const { title, description, clientId } = req.body

  const client = await prisma.client.findUnique({ where: { id: Number(clientId) } })

  if (!client) return res.status(404).json({ error: 'Cliente não encontrado' })
  if (client.userId !== req.userId) return res.status(403).json({ error: 'Acesso negado' })

  const task = await prisma.task.create({
    data: { title, description, clientId: Number(clientId) }
  })

  return res.status(201).json(task)
}

// Lista tarefas do usuário autenticado com filtros opcionais por status e/ou clientId.
// Cada tarefa retornada inclui os dados do cliente relacionado.
export async function getTasks(req: Request, res: Response) {
  const { status, clientId } = req.query

  const tasks = await prisma.task.findMany({
    where: {
      client: { userId: req.userId },
      ...(status && { status: String(status) as any }),
      ...(clientId && { clientId: Number(clientId) })
    },
    include: { client: true }
  })

  return res.json(tasks)
}

// Atualiza título, descrição e/ou status de uma tarefa pelo seu id.
// Valida se a tarefa pertence ao usuário autenticado.
export async function updateTask(req: Request, res: Response) {
  const { id } = req.params
  const { title, description, status } = req.body

  const task = await prisma.task.findUnique({
    where: { id: Number(id) },
    include: { client: true }
  })

  if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' })
  if (task.client.userId !== req.userId) return res.status(403).json({ error: 'Acesso negado' })

  const updated = await prisma.task.update({
    where: { id: Number(id) },
    data: { title, description, status }
  })

  return res.json(updated)
}

// Remove uma tarefa pelo id. Responde com 204 (sem corpo) em caso de sucesso.
// Valida se a tarefa pertence ao usuário autenticado.
export async function deleteTask(req: Request, res: Response) {
  const { id } = req.params

  const task = await prisma.task.findUnique({
    where: { id: Number(id) },
    include: { client: true }
  })

  if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' })
  if (task.client.userId !== req.userId) return res.status(403).json({ error: 'Acesso negado' })

  await prisma.task.delete({ where: { id: Number(id) } })

  return res.status(204).send()
}
