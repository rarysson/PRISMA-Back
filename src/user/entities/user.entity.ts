import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Net } from "./net.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  pic: Buffer;

  @Column("json")
  configs: JSON;

  @OneToMany(() => Net, (net) => net.user)
  nets: Net[];
}
