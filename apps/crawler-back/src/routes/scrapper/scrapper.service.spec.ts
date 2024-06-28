import { Test, TestingModule } from '@nestjs/testing';
import { ScrapperService } from './scrapper.service';
import * as cheerio from 'cheerio';
import { sampleHtml } from '../../../utils/test_utils';
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
      expect(news).toStrictEqual({
        news: [
          {
            rank: 1,
            title:
              'The Forth Deck mini: a portable Forth computer with a discrete CPU',
            points: 49,
            comments: 3,
            count_words_title: 12,
          },
          {
            rank: 2,
            title: 'One Million Checkboxes',
            points: 334,
            comments: 143,
            count_words_title: 3,
          },
          {
            rank: 3,
            title: 'Next gen 3D metal printing',
            points: 30,
            comments: 7,
            count_words_title: 5,
          },
          {
            rank: 4,
            title: 'Why blue animals are so rare',
            points: 48,
            comments: 33,
            count_words_title: 6,
          },
          {
            rank: 5,
            title: 'Liquid Layers',
            points: 185,
            comments: 20,
            count_words_title: 2,
          },
          {
            rank: 6,
            title: "GCC's new fortification level: The gains and costs",
            points: 40,
            comments: 2,
            count_words_title: 8,
          },
          {
            rank: 7,
            title: 'Cloudflare automatically fixes Polyfill.io for free sites',
            points: 63,
            comments: 36,
            count_words_title: 7,
          },
          {
            rank: 8,
            title:
              'Show HN: R2R V2 – A open source RAG engine with prod features',
            points: 154,
            comments: 57,
            count_words_title: 12,
          },
          {
            rank: 9,
            title: 'Figma Slides',
            points: 127,
            comments: 55,
            count_words_title: 2,
          },
          {
            rank: 10,
            title: 'From RSS to My Kindle',
            points: 66,
            comments: 13,
            count_words_title: 5,
          },
          {
            rank: 11,
            title: 'The plan-execute pattern',
            points: 108,
            comments: 39,
            count_words_title: 3,
          },
          {
            rank: 12,
            title: 'Upgrading my Chumby 8 kernel part 11: SD/CF card reader',
            points: 8,
            comments: 0,
            count_words_title: 10,
          },
          {
            rank: 13,
            title: "Things you didn't know about GNU readline (2019)",
            points: 117,
            comments: 64,
            count_words_title: 8,
          },
          {
            rank: 14,
            title: 'Exploring How Cache Memory Works',
            points: 85,
            comments: 20,
            count_words_title: 5,
          },
          {
            rank: 15,
            title: 'Motion (YC W20) Is Hiring Our First DevOps Engineer',
            points: 0,
            comments: 0,
            count_words_title: 9,
          },
          {
            rank: 16,
            title: 'Ghosts in the ROM (2012)',
            points: 124,
            comments: 17,
            count_words_title: 5,
          },
          {
            rank: 17,
            title: 'Tracing garbage collection for arenas',
            points: 45,
            comments: 23,
            count_words_title: 5,
          },
          {
            rank: 18,
            title:
              'Living Computers Museum to permanently close, auction vintage items',
            points: 150,
            comments: 84,
            count_words_title: 9,
          },
          {
            rank: 19,
            title:
              'Test firing of a 3D-printed rocket engine designed through computational model',
            points: 128,
            comments: 43,
            count_words_title: 11,
          },
          {
            rank: 20,
            title: 'Documentation Driven Development (2022)',
            points: 46,
            comments: 34,
            count_words_title: 4,
          },
          {
            rank: 21,
            title: 'Composite modding another Atari, because colors are hard',
            points: 33,
            comments: 0,
            count_words_title: 8,
          },
          {
            rank: 22,
            title: 'Figma AI',
            points: 144,
            comments: 53,
            count_words_title: 2,
          },
          {
            rank: 23,
            title: 'Three ways to think about Go channels',
            points: 134,
            comments: 98,
            count_words_title: 7,
          },
          {
            rank: 24,
            title: 'APL Demonstration (1975) [video]',
            points: 42,
            comments: 11,
            count_words_title: 4,
          },
          {
            rank: 25,
            title: 'How automotive radar measures the velocity of objects',
            points: 37,
            comments: 23,
            count_words_title: 8,
          },
          {
            rank: 26,
            title:
              'How electronic ignition works and also how to make a spark plug play music',
            points: 32,
            comments: 25,
            count_words_title: 14,
          },
          {
            rank: 27,
            title: 'Group actions and hashing unordered multisets (2021)',
            points: 53,
            comments: 4,
            count_words_title: 7,
          },
          {
            rank: 28,
            title: 'The semiotics of barbed wire fence',
            points: 45,
            comments: 29,
            count_words_title: 6,
          },
          {
            rank: 29,
            title: 'Show HN: The Tomb of Nefertari [QV 66] Guided Virtual Tour',
            points: 71,
            comments: 17,
            count_words_title: 11,
          },
          {
            rank: 30,
            title: 'Show HN: Find AI – Perplexity Meets LinkedIn',
            points: 70,
            comments: 49,
            count_words_title: 7,
          },
        ],
      });
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
