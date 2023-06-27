import { Module } from '@nestjs/common';
import { TablesService } from './tables.service';
import { TablesController } from './tables.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TableSchema } from './schemas/table.schema';
import { CommercesModule } from 'src/commerces/commerces.module';
import { ProductsModule } from 'src/products/products.module';
import { WsModule } from 'src/websockets/ws.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Table', schema: TableSchema }]),
    CommercesModule,
    ProductsModule,
    WsModule,
  ],
  controllers: [TablesController],
  providers: [TablesService],
  exports: [TablesService],
})
export class TablesModule {}
