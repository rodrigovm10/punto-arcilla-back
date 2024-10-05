import { CustomError, User } from '../../domain'

export class UserMapper {
  static userEntityFromObject(object: { [key: string]: any }) {
    const { id, name, email, password, role } = object

    if (!id) throw CustomError.badRequest('Missing id')
    if (!name) throw CustomError.badRequest('Missing name')
    if (!password) throw CustomError.badRequest('Missing password')
    if (!role) throw CustomError.badRequest('Missing role')

    return new User(id, name, email, password, role)
  }
}
