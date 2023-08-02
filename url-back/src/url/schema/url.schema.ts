import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UrlDocument = Url & Document;

@Schema({ versionKey: false })
export class Url {
  _id: string;

  @Prop({ required: true })
  urlId: string;

  @Prop({ required: true })
  originalUrl: string;

  @Prop({ required: true })
  shortUrl: string;

  @Prop({ default: Date.now() })
  date: string;
}

export const UrlShema = SchemaFactory.createForClass(Url);
