import {
  IsNotEmpty,
  IsUrl,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateShortUrlDto {
  @IsUrl()
  @IsNotEmpty()
  url: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  alias: string;
}
