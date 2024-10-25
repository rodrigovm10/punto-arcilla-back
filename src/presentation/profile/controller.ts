import { Request, Response } from 'express'
import { ProfileRepository } from '@domain/repositories/profile.repository'
import { CreateProfileDto, UpdateProfileDto } from '@domain/dtos'
import { CreateProfile, UpdateProfile } from '@domain/use-cases'
import { CustomError } from '@domain/errors'

export class ProfileController {
  constructor(private readonly profileRepository: ProfileRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }

    console.log(error)

    return res.status(500).json({ error: 'Internal Server Error' })
  }

  getProfileById = (req: Request, res: Response) => {}

  createProfile = (req: Request, res: Response) => {
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
