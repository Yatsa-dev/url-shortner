import * as shortid from 'shortid';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Url, UrlDocument } from './schema/url.schema';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateShortUrlDto } from './dto/create.dto';
import { ConfigService } from '@nestjs/config';
import { ALIAS_EXIST, URL_NOT_FOUND } from './url.constants';
import { Response } from 'express';

@Injectable()
export class UrlsService {
  constructor(
    @InjectModel(Url.name) private urlsModel: Model<UrlDocument>,
    private configService: ConfigService,
  ) {}

  async create(createShortUrlDto: CreateShortUrlDto) {
    const domain = this.configService.get<string>('domainUrl');

    const url = await this.urlsModel.findOne({
      originalUrl: createShortUrlDto.url,
    });

    if (url) {
      return url;
    }

    let urlId: string;
    if (createShortUrlDto.alias) {
      const alias = await this.findByAlias(createShortUrlDto.alias);
      if (alias) {
        throw new ForbiddenException(ALIAS_EXIST);
      }
      urlId = createShortUrlDto.alias;
    } else {
      urlId = shortid.generate();
    }
    const shortUrl = `${domain}/url/${urlId}`;

    return this.urlsModel.create({
      originalUrl: createShortUrlDto.url,
      shortUrl,
      urlId,
    });
  }

  async redirect(urlId: string, res: Response) {
    const url = await this.urlsModel.findOne({ urlId });

    if (!url) {
      throw new NotFoundException(URL_NOT_FOUND);
    } else {
      return res.redirect(url.originalUrl);
    }
  }

  async findAll() {
    return this.urlsModel.find();
  }

  async findByAlias(alias: string) {
    return this.urlsModel.findOne({ urlId: alias });
  }
}
