import * as React from "react";

function SvgComponent(props) {
  return (
    <svg
      height={36}
      viewBox="0 0 21 21"
      width={36}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        fill="none"
        fillRule="evenodd"
        stroke="#09f"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx={8.5} cy={8.5} r={5} />
        <path d="M17.571 17.5L12 12" />
      </g>
    </svg>
  );
}

export default SvgComponent;
