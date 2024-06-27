import { Test, TestingModule } from '@nestjs/testing';
import { ScrapperService } from './scrapper.service';

describe('ScrapperService', () => {
  let service: ScrapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScrapperService],
    }).compile();

    service = module.get<ScrapperService>(ScrapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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
});
