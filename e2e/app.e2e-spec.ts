import { SpPnpjsUtilityPage } from './app.po';

describe('sp-pnpjs-utility App', () => {
  let page: SpPnpjsUtilityPage;

  beforeEach(() => {
    page = new SpPnpjsUtilityPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
