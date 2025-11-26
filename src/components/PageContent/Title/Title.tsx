type Props = {
  text: string
}

function Title({text}: Props) {
  return (
    <div className="h2 text-center">
      {text}
    </div>
  );
}

export default Title;
