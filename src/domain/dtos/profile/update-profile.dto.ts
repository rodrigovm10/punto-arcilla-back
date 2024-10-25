export class UpdateProfileDto {
  private constructor(public businessDescription?: string, public avatar?: string) {}

  static create(object: { [key: string]: any }): [string?, UpdateProfileDto?] {
    const { businessDescription, avatar } = object

    return [undefined, new UpdateProfileDto(businessDescription, avatar)]
  }
}
