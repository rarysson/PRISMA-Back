import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LoginUserDto, LoginUseResDto } from "./dto/login-user.dto";
import { UserDto } from "./dto/user.dto";
import { User } from "./entities/user.entity";
import { Net } from "./entities/net.entity";
import { NetDto } from "./dto/net.dto";

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

  async update_net(user_id: number, name: string, net: NetDto): Promise<void> {
    const res_net = await this.netsRepository.findOne({ name });
    const user = await this.usersRepository.findOne(user_id);

    if (user) {
      if (res_net) {
        await this.netsRepository.update({ name }, net);
      } else {
        net.user = user;
        await this.netsRepository.save(net);
      }
    }
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
