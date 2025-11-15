import type { setCurrentCatalogPage } from "../../app/slices/catalogSlice";
import { shopPages } from "../../siteConfig";
import Catalog from "./Catalog/Catalog";
import Homepage from "./Homepage/Homepage";
import Title from "./Title/Title";

type PageContentProps = {
  currentShopPage: string;
  currentCatalogPage: number;
  switchCatalogPage: typeof setCurrentCatalogPage;
};

function PageContent({
  currentShopPage,
  currentCatalogPage,
  switchCatalogPage
}: PageContentProps) {
  let content;
  if (currentShopPage === shopPages.HOMEPAGE) {
    content = <Homepage />;
  } else if (currentShopPage === shopPages.CATALOG) {
    content = <Catalog page={currentCatalogPage} switchCatalogPage={switchCatalogPage}/>;
  }

  return (
    <div className="page-content container-fluid mb-5 pb-5">
      <Title text={currentShopPage} />
      {content}
    </div>
  );
}

export default PageContent;
