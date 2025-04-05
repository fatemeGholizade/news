import type { SVGProps } from "react";

interface ISvgProps extends SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  color?: string;
  className?: string;
}

const SvgArrow: React.FC<ISvgProps> = ({
  width = 12,
  height = 12,
  color = "#475467",
  className = "",
  ...props
}) => (
  <svg
    viewBox="0 0 12 12"
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={className}
    fill="none"
    {...props}
  >
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="m5.25 2.38 3.803 3.803c.45.45.45 1.185 0 1.634L5.25 11.62"
    />
  </svg>
);
export default SvgArrow;
