import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CommercesModule } from './commerces/commerces.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { TablesModule } from './tables/tables.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { WsModule } from './websockets/ws.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL, {
      dbName: 'food-order-app',
    }),
    CommercesModule,
    AuthModule,
    TablesModule,
    ProductsModule,
    OrdersModule,
    WsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
