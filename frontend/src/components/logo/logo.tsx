import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={"/"} className="flex items-center gap-2">
      <div className="text-white h-6.5 w-6.5 rounded flex items-center justify-center">
        <AppBadgingOutlineIcon color="#E7000B" />
      </div>
      <span className="font-semibold text-lg">Mentorly</span>
    </Link>
  );
};

export default Logo;

const AppBadgingOutlineIcon = ({
  size = undefined,
  color = "#000000",
  strokeWidth = 2,
  background = "transparent",
  opacity = 1,
  rotation = 0,
  shadow = 0,
  flipHorizontal = false,
  flipVertical = false,
  padding = 0,
}) => {
  const transforms = [];
  if (rotation !== 0) transforms.push(`rotate(${rotation}deg)`);
  if (flipHorizontal) transforms.push("scaleX(-1)");
  if (flipVertical) transforms.push("scaleY(-1)");

  const viewBoxSize = 24 + padding * 2;
  const viewBoxOffset = -padding;
  const viewBox = `${viewBoxOffset} ${viewBoxOffset} ${viewBoxSize} ${viewBoxSize}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        opacity,
        transform: transforms.join(" ") || undefined,
        filter:
          shadow > 0 ? `drop-shadow(0 ${shadow}px ${shadow * 2}px rgba(0,0,0,0.3))` : undefined,
        backgroundColor: background !== "transparent" ? background : undefined,
      }}>
      <path
        fill="currentColor"
        d="M2 12q0-2.2.85-4.075t2.325-3.25t3.4-2.087t4.125-.563q.425.05.675.363t.175.737t-.412.675t-.763.225q-1.725-.075-3.237.487T6.475 6.176T4.663 8.763T4 12q0 3.35 2.325 5.675T12 20q1.725 0 3.213-.663t2.587-1.812q1.15-1.2 1.7-2.725t.475-3.175q-.025-.425.225-.762t.675-.413t.738.175t.362.675q.15 2.175-.562 4.1t-2.063 3.4q-1.425 1.55-3.325 2.375T12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12m16-3q-1.25 0-2.125-.875T15 6t.875-2.125T18 3t2.125.875T21 6t-.875 2.125T18 9"
      />
    </svg>
  );
};
