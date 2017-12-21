import { CoinnewsngPage } from './app.po';

describe('coinnewsng App', () => {
  let page: CoinnewsngPage;

  beforeEach(() => {
    page = new CoinnewsngPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
