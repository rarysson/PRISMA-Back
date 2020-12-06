import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LoginUserDto, LoginUseResDto } from "./dto/login-user.dto";
import { UserDto } from "./dto/user.dto";
import { User } from "./entities/user.entity";
import { Net } from "./entities/net.entity";
import { NetDto } from "./dto/net.dto";
import { NetsDto } from "./dto/nets.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Net) private netsRepository: Repository<Net>
  ) {}

  async create_user(user: UserDto): Promise<void> {
    await this.usersRepository.save(user);
  }

  async get_user(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async update_user(id: number, user: UserDto): Promise<void> {
    this.usersRepository.update(id, user);
  }

  async get_all_nets(user_id: number): Promise<Array<NetsDto>> {
    const user = await this.usersRepository.findOne(user_id);
    const res_nets = await this.netsRepository.find({ user });

    if (user) {
      return res_nets
        ? res_nets.map((net) => ({
            name: net.name,
            last_update: net.last_update
          }))
        : null;
    }
  }

  async get_net(user_id: number, name: string): Promise<Net> {
    const res_net = await this.netsRepository.findOne({ name });
    const user = await this.usersRepository.findOne(user_id);

    if (user) {
      return res_net ? res_net : null;
    }
  }

  async update_net(user_id: number, name: string, net: NetDto): Promise<void> {
    const res_net = await this.netsRepository.findOne({ name });
    const user = await this.usersRepository.findOne(user_id);

    if (user) {
      if (res_net) {
        await this.netsRepository.update({ name }, net);
      } else {
        net.user = user;
        net.name = name;
        await this.netsRepository.save(net);
      }
    }
  }

  async get_config(id: number): Promise<JSON> {
    const user = await this.usersRepository.findOne(id);

    return user.configs ? user.configs : null;
  }

  async update_config(id: number, config: JSON): Promise<void> {
    const user = await this.usersRepository.findOne(id);

    if (user.configs) {
      const keys = Object.keys(config);
      const user_config = user.configs;

      keys.forEach((key) => {
        user_config[key] = config[key];
      });

      await this.usersRepository.update(id, { configs: user_config });
    } else {
      await this.usersRepository.update(id, { configs: config });
    }
  }

  async delete_user(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async login(login: LoginUserDto): Promise<LoginUseResDto> {
    const user = await this.usersRepository.findOne({ email: login.email });

    if (
      user &&
      user.email === login.email &&
      user.password === login.password
    ) {
      delete user.password;
      return user;
    }

    return null;
  }
}
