export class AddressEntity {
  constructor(
    public id: string,
    public userId: string,
    public street: string,
    public city: string,
    public state: string,
    public neighborhood: string,
    public postalCode: number,
    public houseNumber: number
  ) {}
}
