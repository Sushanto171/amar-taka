import logo from "./../../../public/fav.png";
export default function Logo({
  width = 55,
  height = 41,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <>
      <img width={width} height={height} src={logo} />
    </>
  );
}
