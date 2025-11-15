import type { setCurrentShopPage } from "../../app/slices/sitePagesSlice";
import type { shopPages } from "../../siteConfig";
import Logo from "./Logo/Logo";
import Navigation from "./Navigation/Navigation";

type HeaderProps = {
  currentShopPage: shopPages;
  onClick: typeof setCurrentShopPage;
};

function Header({ currentShopPage, onClick }: HeaderProps) {
  return (
    <header className="navigation container-fluid">
      <div className="row">
        <div className="col-3">
          <Logo />
        </div>
        <div className="col-9">
          <Navigation currentShopPage={currentShopPage} onClick={onClick}/>
        </div>
      </div>
    </header>
  );
}

export default Header;
