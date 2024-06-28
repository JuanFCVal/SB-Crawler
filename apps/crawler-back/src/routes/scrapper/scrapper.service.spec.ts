import { Test, TestingModule } from '@nestjs/testing';
import { ScrapperService } from './scrapper.service';
import * as cheerio from 'cheerio';
import { newsResponse, sampleHtml } from '../../../utils/test_utils';
import fetchMock from 'jest-fetch-mock';

describe('ScrapperService', () => {
  let service: ScrapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScrapperService],
    }).compile();
    fetchMock.resetMocks();
    service = module.get<ScrapperService>(ScrapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getHackerNews', () => {
    it('should return the news data for each element', async () => {
      process.env.NEWS_URL = 'https://example.com/news';
      fetchMock.mockResponse(() =>
        Promise.resolve({
          text: () => Promise.resolve(sampleHtml),
          body: sampleHtml,
        }),
      );
      const news = await service.getHackerNews();
      expect(news).toStrictEqual(newsResponse);
    });
    it('should return an error if the request fails', async () => {
      process.env.NEWS_URL = 'https://example.com/news';
      fetchMock.mockReject(new Error('Failed to fetch hacker news'));
      await expect(service.getHackerNews()).rejects.toThrow(
        'Failed to fetch hacker news',
      );
    });
  });

  describe('extractNewsData', () => {
    it('should return the news data for each news element', () => {
      const $ = cheerio.load(sampleHtml);
      const newsElement = $('tr.athing').first();
      const detailElement = $('td.subtext').first();
      const newsData = service.extractNewsData($, newsElement, detailElement);
      expect(newsData).toEqual({
        rank: 1,
        title:
          'The Forth Deck mini: a portable Forth computer with a discrete CPU',
        points: 49,
        comments: 3,
        count_words_title: 12,
      });
    });
  });

  describe('extractData', () => {
    it('should return the text of the element', () => {
      const $ = cheerio.load('<div><p class="text">Hello World</p></div>');
      const element = $('p.text');
      const text = service.extractData(element, '');
      expect(text).toBe('Hello World');
    });
    it('should return the text of the element after trim', () => {
      const $ = cheerio.load(
        '<div><p class="text">   Hello World   </p></div>',
      );
      const element = $('p.text');
      const text = service.extractData(element, '');
      expect(text).toBe('Hello World');
    });
    it('should return the text of the element after applying the transform function', () => {
      const $ = cheerio.load(
        '<div><p class="text">   Hello World   </p></div>',
      );
      const element = $('p.text');
      const transform = (text: string) => text.toUpperCase();
      const text = service.extractData(element, '', transform);
      expect(text).toBe('HELLO WORLD');
    });
  });

  describe('countWords', () => {
    it('should return 0 if sentence is not proviced', () => {
      expect(service.countWords(undefined)).toBe(0);
    });
    it('should return 3 if sentence is "The plan-execute pattern"', () => {
      const sentence = 'The plan-execute pattern';
      expect(service.countWords(sentence)).toBe(3);
    });
    it('should return 12 if sentence is "The Forth Deck mini: a portable Forth computer with a discrete CPU"', () => {
      const sentence =
        'The Forth Deck mini: a portable Forth computer with a discrete CPU';
      expect(service.countWords(sentence)).toBe(12);
    });
    it('should return 0 if sentence is ""', () => {
      const sentence = '';
      expect(service.countWords(sentence)).toBe(0);
    });
    it('should return 3 if sentence is "The - plan pattern', () => {
      const sentence = 'The - plan pattern';
      expect(service.countWords(sentence)).toBe(3);
    });
    it('should return 3 if sentence is "The 1 plan"', () => {
      const sentence = 'The 1 plan';
      expect(service.countWords(sentence)).toBe(3);
    });
    it('Should return 0 if sentence is "- . -"', () => {
      const sentence = '- . -';
      expect(service.countWords(sentence)).toBe(0);
    });
  });

  describe('extractRank', () => {
    it('should return 0 if element is undefined', () => {
      const rank = service.extractRank(undefined);
      expect(rank).toBe(0);
    });
    it('should return the number as rank for each news element', () => {
      const $ = cheerio.load(sampleHtml);
      const newsElements = $('tr.athing');
      newsElements.each((index, element) => {
        const loadedElement = $(element);
        const rank = service.extractRank(loadedElement);
        expect(rank).toBe(index + 1);
      });
    });
    it('should return 0 if rank is not found', () => {
      const $ = cheerio.load('<span></span>');
      const element = $('tr.athing');
      const loadedElement = $(element);

      const rank = service.extractRank(loadedElement);
      expect(rank).toBe(0);
    });
  });

  describe('extractTitle', () => {
    it('should return "" if element is undefined', () => {
      const rank = service.extractTitle(undefined);
      expect(rank).toBe('');
    });
    it('should return the title for each news element', () => {
      const titles = [
        'The Forth Deck mini: a portable Forth computer with a discrete CPU',
        'One Million Checkboxes',
        'Next gen 3D metal printing',
        'Why blue animals are so rare',
        'Liquid Layers',
        "GCC's new fortification level: The gains and costs",
        'Cloudflare automatically fixes Polyfill.io for free sites',
        'Show HN: R2R V2 – A open source RAG engine with prod features',
        'Figma Slides',
        'From RSS to My Kindle',
      ];
      const $ = cheerio.load(sampleHtml);
      const newsElements = $('tr.athing');
      const elementsToTEst = newsElements.slice(0, 10);
      elementsToTEst.each((index, element) => {
        const loadedElement = $(element);
        const title = service.extractTitle(loadedElement);
        expect(title).toBe(titles[index]);
      });
    });
    it('should return an empty string if title is not found', () => {
      const $ = cheerio.load('<span></span>');
      const element = $('tr.athing');
      const loadedElement = $(element);
      const title = service.extractTitle(loadedElement);
      expect(title).toBe('');
    });
  });

  describe('extractPoints', () => {
    it('should return 0 if element is undefined', () => {
      const rank = service.extractPoints(undefined);
      expect(rank).toBe(0);
    });
    it('should return the points for each news element', () => {
      const points = [49, 334, 30, 48, 185, 40, 63, 154, 127, 66];
      const $ = cheerio.load(sampleHtml);
      const detailElements = $('td.subtext');
      const elementsToTest = detailElements.slice(0, 10);
      elementsToTest.each((index, element) => {
        const point = service.extractPoints($(element));
        expect(point).toBe(points[index]);
      });
    });
    it('should return 0 if points are not found', () => {
      const $ = cheerio.load('<span></span>');
      const element = $('td.subtext');
      const point = service.extractPoints($(element));
      expect(point).toBe(0);
    });
  });

  describe('extractComments', () => {
    it('should return 0 if element is undefined', () => {
      const rank = service.extractComments(undefined);
      expect(rank).toBe(0);
    });
    it('should return the number of comments for each news element', () => {
      const comments = [3, 143, 7, 33, 20, 2, 36, 57, 55, 13];
      const $ = cheerio.load(sampleHtml);
      const detailElements = $('td.subtext');
      const elementsToTest = detailElements.slice(0, 10);
      elementsToTest.each((index, element) => {
        const comment = service.extractComments($(element));
        expect(comment).toBe(comments[index]);
      });
    });
    it('should return 0 if comments are not found', () => {
      const $ = cheerio.load('<span></span>');
      const element = $('td.subtext');
      const comment = service.extractComments($(element));
      expect(comment).toBe(0);
    });
  });
});
