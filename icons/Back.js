import * as React from 'react'

function SvgComponent (props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={21}
      height={21}
      viewBox="0 0 21 21"
      {...props}
    >
      <path
        fill="none"
        stroke="#09f"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.502 7.5c5.185-.471 8.517 1.529 9.999 6-2.896-3.219-6.23-3.886-10-2v-.002V14.5l-5-5 5-5z"
      />
    </svg>
  )
}

export default SvgComponent
