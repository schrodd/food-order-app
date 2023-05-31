import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CommercesModule } from './commerces/commerces.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { TablesModule } from './tables/tables.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    CommercesModule,
    AuthModule,
    TablesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
