import * as React from "react";

function SvgComponent(props) {
  return (
    <svg
      height={21}
      viewBox="0 0 21 21"
      width={21}
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
        <path d="M14.5 7.5l-3.978-4-4.022 4M10.522 3.521V15.5M7.5 10.5h-2a2 2 0 00-2 2v4a2 2 0 002 2h10a2 2 0 002-2v-4a2 2 0 00-2-2h-2" />
      </g>
    </svg>
  );
}

export default SvgComponent;
