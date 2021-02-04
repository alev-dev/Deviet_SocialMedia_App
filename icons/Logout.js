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
        stroke="#e90a0a"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7.404 13.5l-2.904-3 2.905-3M4.5 10.5h9M8 3.5l7.5.003c1.104.001 2 .896 2 2v9.995a2 2 0 01-2 2H8" />
      </g>
    </svg>
  );
}

export default SvgComponent;
