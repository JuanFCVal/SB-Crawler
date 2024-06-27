import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { INewsItem } from 'src/types/news';
import { sampleHtml } from '../../../utils/test_utils';

@Injectable()
export class ScrapperService {
  async getHackerNews() {
    // const response = await fetch(process.env.NEWS_URL);
    // const html = await response.text();
    const $ = cheerio.load(sampleHtml);
    const newsElements = $('tr.athing');
    const detailElements = $('td.subtext');

    const news: INewsItem[] = newsElements
      .map((index, element) => {
        return this.extractNewsData($, element, detailElements.eq(index));
      })
      .get();
    return { news };
  }

  private extractNewsData(
    $: cheerio.Root,
    newsElement: cheerio.Element,
    detailElement: cheerio.Cheerio,
  ): INewsItem {
    const rank = this.extractRank($, newsElement);
    const title = this.extractTitle($, newsElement);
    const points: number = this.extractPoints($, detailElement);
    const comments = this.extractComments($, detailElement);
    const count_words_title = this.countWords(title);
    return { rank, title, points, comments, count_words_title };
  }

  public countWords(value: string): number {
    const words = value.split(' ');
    //remove elements that only contains special characters
    const wordsWithoutSpecialChars = words.filter((word) => {
      return word.match(/[a-zA-Z0-9]/);
    });
    return wordsWithoutSpecialChars.length;
  }

  private extractRank($: cheerio.Root, element: cheerio.Element): number {
    const rank = $(element).find('.rank').text();
    return this.extractNumbersFromString(rank);
  }

  private extractTitle($: cheerio.Root, element: cheerio.Element): string {
    return $(element).find('.titleline > a').text().trim();
  }

  private extractPoints($: cheerio.Root, element: cheerio.Cheerio): number {
    const points = element.find('.score').text();
    return this.extractNumbersFromString(points);
  }

  private extractComments($: cheerio.Root, element: cheerio.Cheerio): number {
    const commentsText = element
      .find('span.subline > a:last-child')
      .text()
      .trim();
    return this.extractNumbersFromString(commentsText);
  }

  private extractNumbersFromString(value: string) {
    const match = value.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  }
}
