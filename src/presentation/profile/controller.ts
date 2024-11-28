import { Request, Response } from 'express'
import { CustomError } from '@domain/errors'
import { ProfileRepository } from '@domain/repositories/profile.repository'
import { CreateProfileDto, UpdateProfileDto } from '@domain/dtos'
import { CreateProfile, UpdateProfile, GetProfileById } from '@domain/use-cases'

export class ProfileController {
  constructor(private readonly profileRepository: ProfileRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }

    return res.status(500).json({ error: 'Internal Server Error' })
  }

  getProfileById = (req: Request, res: Response) => {
    const id = req.params.id

    if (!id) return res.status(400).json({ error: 'Missing requiered parameter: id' })

    new GetProfileById(this.profileRepository)
      .execute(id)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }

  createProfile = (req: Request, res: Response) => {
    console.log(req.body)
    const [error, profileDto] = CreateProfileDto.create(req.body)

    if (error) return res.status(400).json({ error })

    new CreateProfile(this.profileRepository)
      .execute(profileDto!)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }

  updateProfile = (req: Request, res: Response) => {
    const id = req.params.id
    const [error, profileDto] = UpdateProfileDto.create(req.body)

    if (error) return res.status(400).json({ error })

    if (!id) return res.status(400).json({ error: 'Missing required parameter: id' })

    new UpdateProfile(this.profileRepository)
      .execute(id, profileDto!)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }
}
