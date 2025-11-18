import { useAppSelector } from "../../../app/hooks";
import type { RootState } from "../../../app/store";
import "./Logo.css";

function Logo() {
  const title = useAppSelector((state: RootState) => state.shop.title);

  return (
    <div className="d-flex flex-column">
      <img src="/logo.svg" alt="Logo" className="logo m-2 p-2" />
      <span className="text-end fs-up-md-12 text-xxl-center">{title}</span>
      
    </div>
  );
}

export default Logo;
