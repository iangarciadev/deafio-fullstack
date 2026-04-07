import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

// Middleware de autenticação JWT. Lê o token do header Authorization (formato
// "Bearer <token>"), valida a assinatura e injeta o userId decodificado na
// requisição. Bloqueia com 401 se o token estiver ausente ou inválido.
export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number }
    req.userId = decoded.userId
    next()
  } catch {
    return res.status(401).json({ error: 'Token inválido' })
  }
}
