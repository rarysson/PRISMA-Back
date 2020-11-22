import { Net } from "../entities/net.entity";

export class LoginUserDto {
  email: string;
  password: string;
}

export class LoginUseResDto {
  id: number;
  name: string;
  email: string;
  password: string;
  pic: Buffer;
  configs: JSON;
  nets: Net[];
}
