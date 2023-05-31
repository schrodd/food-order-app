import { Module } from '@nestjs/common';
import { TablesService } from './tables.service';
import { TablesController } from './tables.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TableSchema } from './schemas/table.schema';
import { CommercesModule } from 'src/commerces/commerces.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Table', schema: TableSchema }]),
    CommercesModule
  ],
  controllers: [TablesController],
  providers: [TablesService]
})
export class TablesModule { }
