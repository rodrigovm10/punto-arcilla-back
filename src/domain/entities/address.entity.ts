export class AddressEntity {
  constructor(
    public id: string,
    public user_id: string,
    public street: string,
    public city: string,
    public state: string,
    public neighborhood: string,
    public postal_code: number,
    public house_number: number
  ) {}
}
