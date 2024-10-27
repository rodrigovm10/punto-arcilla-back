export class CreateAddressDto {
  private constructor(
    public userId: string,
    public street: string,
    public city: string,
    public state: string,
    public neighborhood: string,
    public postalCode: number,
    public houseNumber: number
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateAddressDto?] {
    const { userId, street, city, state, neighborhood, postalCode, houseNumber } = object

    if (!userId) return ['Missing userId']
    if (!street) return ['Missing street']
    if (!city) return ['Missing city']
    if (!state) return ['Missing state']
    if (!neighborhood) return ['Missing neighborhood']
    if (!postalCode) return ['Missing postalCode']
    if (!houseNumber) return ['Missing houseNumber']

    return [
      undefined,
      new CreateAddressDto(userId, street, city, state, neighborhood, postalCode, houseNumber)
    ]
  }
}
