import {
  Controller,
  Post,
  Res,
  HttpStatus,
  Body,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../users/jwt-auth.guard';
import { ArticlesService } from './articles.service';
import { Response } from 'express';
import { CreateArticleDto } from './dto/create-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createArticle(
    @Res() res: Response,
    @Body() articleBody: CreateArticleDto,
  ) {
    const { title, body } = await this.articlesService.create(articleBody);
    res.status(HttpStatus.CREATED).json({
      article: { title: title, body: body },
    });
  }
}
