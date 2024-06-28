import { Test, TestingModule } from '@nestjs/testing';
import { ScrapperController } from './scrapper.controller';
import { ScrapperService } from './scrapper.service';
import { newsResponse, sampleHtml } from '../../../utils/test_utils';
describe('ScrapperController', () => {
  let controller: ScrapperController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScrapperController],
      providers: [ScrapperService],
    }).compile();
    fetchMock.resetMocks();
    controller = module.get<ScrapperController>(ScrapperController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of news and time elapsed', async () => {
    process.env.NEWS_URL = 'https://example.com/news';
    fetchMock.mockResponse(() =>
      Promise.resolve({
        text: () => Promise.resolve(sampleHtml),
        body: sampleHtml,
      }),
    );
    const response = await controller.getHackerNews();
    expect(response).toMatchObject(newsResponse);
  });
  it('should return an error message if the request fails', async () => {
    fetchMock.mockReject(new Error('Failed to fetch hacker news'));
    try {
      await controller.getHackerNews();
    } catch (error) {
      expect(error).toMatchObject({
        message: 'Failed to fetch hacker news',
      });
    }
  });
});
