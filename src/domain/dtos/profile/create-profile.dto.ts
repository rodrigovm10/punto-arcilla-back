export class CreateProfileDto {
  private constructor(
    public userId: string,
    public businessDescription?: string,
    public avatar?: string
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateProfileDto?] {
    const { userId, businessDescription, avatar } = object

    if (!userId) return ['Missing userId']

    return [undefined, new CreateProfileDto(userId, businessDescription, avatar)]
  }
}
