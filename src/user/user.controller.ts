import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put
} from "@nestjs/common";
import { UserDto } from "./dto/user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { UserService } from "./user.service";
import { NetDto } from "./dto/net.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create_user(@Body() userDto: UserDto) {
    this.userService.create_user(userDto);
  }

  @Get(":id")
  get_user(@Param("id", ParseIntPipe) id: number) {
    return this.userService.get_user(id);
  }

  @Put(":id")
  update_user(@Param("id", ParseIntPipe) id: number, @Body() userDto: UserDto) {
    this.userService.update_user(id, userDto);
  }

  @Get(":id/nets")
  get_all_nets(@Param("id", ParseIntPipe) id: number) {
    return this.userService.get_all_nets(id);
  }

  @Get(":id/net/:name")
  get_net(@Param("id", ParseIntPipe) id: number, @Param("name") name: string) {
    return this.userService.get_net(id, name);
  }

  @Put(":id/net/:name")
  update_net(
    @Param("id", ParseIntPipe) id: number,
    @Param("name") name: string,
    @Body() net: NetDto
  ) {
    this.userService.update_net(id, name, net);
  }

  @Get(":id/config")
  get_config(@Param("id", ParseIntPipe) id: number) {
    return this.userService.get_config(id);
  }

  @Put(":id/config")
  update_config(@Param("id", ParseIntPipe) id: number, @Body() config: JSON) {
    this.userService.update_config(id, config);
  }

  @Delete(":id")
  delete_user(@Param("id", ParseIntPipe) id: number) {
    this.userService.delete_user(id);
  }

  @Post("login")
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }
}
