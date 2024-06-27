import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ScrapperService } from './scrapper.service';
import { ResponseInterceptor } from '../../interceptors/response.interceptor';

@Controller('scrapper')
@UseInterceptors(ResponseInterceptor)
export class ScrapperController {
  constructor(private readonly scrapperService: ScrapperService) {}
  @Get()
  getHackerNews() {
    return this.scrapperService.getHackerNews();
  }
}
