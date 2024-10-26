export class UpdateProfileDto {
  private constructor(
    public name: string,
    public businessDescription?: string,
    public avatar?: string
  ) {}

  static create(object: { [key: string]: any }): [string?, UpdateProfileDto?] {
    const { name, businessDescription, avatar } = object

    return [undefined, new UpdateProfileDto(name, businessDescription, avatar)]
  }
}
