import { Module } from '@nestjs/common';
import { CommercesController } from './commerces.controller';
import { CommercesService } from './commerces.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CommerceSchema } from './schemas/commerce.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Commerce', schema: CommerceSchema }]),
  ],
  controllers: [CommercesController],
  providers: [CommercesService],
  exports: [CommercesService],
})
export class CommercesModule {}
