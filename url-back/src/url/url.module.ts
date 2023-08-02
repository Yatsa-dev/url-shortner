import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Url, UrlShema } from './schema/url.schema';
import { UrlsService } from './url.service';
import { UrlsController } from './url.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Url.name, schema: UrlShema }])],
  providers: [UrlsService],
  controllers: [UrlsController],
})
export class UrlsModule {}
