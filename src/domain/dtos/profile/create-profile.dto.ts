export class CreateProfileDto {
  private constructor(
    public userId: string,
    public name: string,
    public businessDescription?: string,
    public avatar?: string
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateProfileDto?] {
    const { userId, name, businessDescription, avatar } = object

    if (!userId) return ['Missing userId']
    if (!name) return ['Missing name']

    return [undefined, new CreateProfileDto(userId, businessDescription, avatar)]
  }
}
