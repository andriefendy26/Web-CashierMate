import React from "react";

export default function index({ children, style }) {
  return (
    <button className={`p-2 ${style} rounded-lg font-lg px-7  `}>
      <h1>{children}</h1>
    </button>
  );
}
