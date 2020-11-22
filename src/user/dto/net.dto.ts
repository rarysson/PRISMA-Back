import { User } from "../entities/user.entity";

export class NetDto {
  name: string;
  last_update: number;
  net: JSON;
  paper_dimensions: JSON;
  user?: User;
}
