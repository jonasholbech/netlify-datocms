import React from "react";

export default function Instructions({ onClose }) {
  return (
    <section>
      <p>Use ```</p>
      <button onClick={onClose}>Close me!</button>
    </section>
  );
}
