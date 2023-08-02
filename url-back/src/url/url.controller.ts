import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UrlsService } from './url.service';
import { CreateShortUrlDto } from './dto/create.dto';

@Controller('url')
export class UrlsController {
  constructor(private urlsService: UrlsService) {}

  @Get()
  find() {
    return this.urlsService.findAll();
  }

  @Post('short')
  create(@Body() createShortUrlDto: CreateShortUrlDto) {
    return this.urlsService.create(createShortUrlDto);
  }

  @Get('/:urlId')
  redirect(@Param('urlId') urlId: string, @Res() res: Response) {
    return this.urlsService.redirect(urlId, res);
  }
}
