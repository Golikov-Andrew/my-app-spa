type TitleProps = {
  text: string
}

function Title({text}: TitleProps) {
  return (
    <div className="h2 text-center">
      {text}
    </div>
  );
}

export default Title;
