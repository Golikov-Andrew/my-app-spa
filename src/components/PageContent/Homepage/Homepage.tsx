import { useAppSelector } from "../../../app/hooks";
import type { RootState } from "../../../app/store";
import parse from "html-react-parser";

function Homepage() {
  const description = useAppSelector(
    (state: RootState) => state.shop.description
  );

  return (
    <div className="homepage text-center m-4 col-12 col-sm-10 col-md-8 col-lg-6 mx-auto">
      <p>{parse(description)}</p>

      <div>
        <video className="w-100" autoPlay muted loop>
          <source src="/reason-video1.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

export default Homepage;
