import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Net {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  last_update: number;

  @Column("json")
  net: JSON;

  @Column("json")
  paper_dimensions: JSON;

  @ManyToOne(() => User, (user) => user.nets)
  user: User;
}
