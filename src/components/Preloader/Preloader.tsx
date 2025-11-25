import "./Preloader.css";

type PreloaderProps = {
  preloaderMessage?: string;
  postloaderMessage?: string;
};

function Preloader({ preloaderMessage, postloaderMessage }: PreloaderProps) {
  return (
    <>
      {preloaderMessage && (
        <div className="shop-preloader preloader-message">
          {preloaderMessage}
        </div>
      )}
      {postloaderMessage && (
        <div className="shop-preloader col-6 mx-auto">{postloaderMessage}</div>
      )}
    </>
  );
}

export default Preloader;
