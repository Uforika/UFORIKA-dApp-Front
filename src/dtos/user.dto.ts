export class UserDTO {

  id: number;

  email: string;

  constructor(data: Partial<UserDTO>) {
    Object.assign(this, data);
  }

}
