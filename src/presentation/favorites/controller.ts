import { CreateFavoriteDto } from '@domain/dtos'
import { CustomError } from '@domain/errors'
import { FavoriteRepository } from '@domain/repositories'
import { CreateFavorite, GetFavorite } from '@domain/use-cases'
import { Request, Response } from 'express'

export class FavoriteController {
  constructor(private readonly favoriteRepository: FavoriteRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }

    return res.status(500).json({ error: 'Internal Server Error' })
  }

  createFavorite = (req: Request, res: Response) => {
    const [error, favoriteDto] = CreateFavoriteDto.create(req.body)

    if (error) return res.status(400).json({ error })

    return new CreateFavorite(this.favoriteRepository)
      .execute(favoriteDto!)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }

  getFavorite = (req: Request, res: Response) => {
    const id = req.params.id

    if (!id) return res.status(400).json('No hay id de usuario')

    return new GetFavorite(this.favoriteRepository)
      .execute(id)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }
}
