import Logo from "./Logo/Logo";
import Navigation from "./Navigation/Navigation";


function Header() {
  return (
    <header className="navigation container-fluid">
      <div className="row">
        <div className="col-3">
          <Logo />
        </div>
        <div className="col-9">
          <Navigation />
        </div>
      </div>
    </header>
  );
}

export default Header;
