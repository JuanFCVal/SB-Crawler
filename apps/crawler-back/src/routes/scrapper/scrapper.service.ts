import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { INewsItem } from 'src/types/news';
import { sampleHtml } from '../../../utils/test_utils';

@Injectable()
export class ScrapperService {
  async getHackerNews() {
    const response = await fetch(process.env.NEWS_URL);
    const rawText = await response.text();
    const $ = cheerio.load(rawText);
    const newsElements = $('tr.athing');
    const detailElements = $('td.subtext');
    const news: INewsItem[] = newsElements
      .map((index, element) => {
        const elementLoaded = $(element);
        const detailLoaded = $(detailElements.eq(index));
        return this.extractNewsData($, elementLoaded, detailLoaded);
      })
      .get();
    return { news };
  }

  extractNewsData(
    $: cheerio.Root,
    newsElement: cheerio.Cheerio,
    detailElement: cheerio.Cheerio,
  ): INewsItem {
    const rank = this.extractRank(newsElement);
    const title = this.extractTitle(newsElement);
    const points: number = this.extractPoints(detailElement);
    const comments = this.extractComments(detailElement);
    const count_words_title = this.countWords(title);
    return { rank, title, points, comments, count_words_title };
  }

  countWords(value: string): number {
    const words = value.split(' ');
    const wordsWithoutSpecialChars = words.filter((word) => {
      return word.match(/[a-zA-Z0-9]/);
    });
    return wordsWithoutSpecialChars.length;
  }

  extractData<T>(
    element: cheerio.Cheerio,
    selector: string,
    transform: (text: string) => T = (text) => text as T,
  ): T {
    const text = selector
      ? element.find(selector).text().trim()
      : element.text().trim();
    return transform(text);
  }

  extractRank(element: cheerio.Cheerio): number {
    return this.extractData(element, '.rank', this.extractNumbersFromString);
  }

  extractTitle(element: cheerio.Cheerio): string {
    return this.extractData(element, '.titleline > a');
  }

  extractPoints(element: cheerio.Cheerio): number {
    return this.extractData(element, '.score', this.extractNumbersFromString);
  }

  extractComments(element: cheerio.Cheerio): number {
    return this.extractData(
      element,
      'span.subline > a:last-child',
      this.extractNumbersFromString,
    );
  }

  private extractNumbersFromString(value: string) {
    const match = value.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  }
}
