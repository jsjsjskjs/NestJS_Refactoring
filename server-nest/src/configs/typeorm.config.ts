import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig : TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'sik',
  password: 'govl5968',
  database: 'atoz',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true
}