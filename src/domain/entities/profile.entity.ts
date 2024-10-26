export class ProfileEntity {
  constructor(
    public id: string,
    public user_id: string,
    public name: string,
    public business_description?: string,
    public avatar?: string
  ) {}
}
