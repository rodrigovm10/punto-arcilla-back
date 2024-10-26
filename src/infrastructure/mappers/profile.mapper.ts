import { ProfileEntity } from '@domain/entities'
import { CustomError } from '@domain/errors'

export class ProfileMapper {
  static profileEntityFromObject(object: { [key: string]: any }) {
    const { id, user_id, name, business_description, avatar } = object

    if (!id) throw CustomError.badRequest('Missing ID')
    if (!user_id) throw CustomError.badRequest('Missing user_id')
    // if (!avatar) throw CustomError.badRequest('Missing avatar')

    return new ProfileEntity(id, user_id, name, business_description, avatar)
  }
}
