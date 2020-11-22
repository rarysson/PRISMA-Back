import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { User } from "./entities/user.entity";
import { Net } from "./entities/net.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, Net])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
