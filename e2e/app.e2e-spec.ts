import { SaleManagementPage } from './app.po';

describe('sale-management App', () => {
  let page: SaleManagementPage;

  beforeEach(() => {
    page = new SaleManagementPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
