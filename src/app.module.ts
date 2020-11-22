import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user/entities/user.entity";
import { Net } from "./user/entities/net.entity";

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "prisma",
      entities: [User, Net],
      synchronize: true
    })
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
