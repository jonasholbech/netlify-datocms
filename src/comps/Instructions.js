import React from "react";
import Button from "muicss/lib/react/button";

export default function Instructions({ onClose }) {
  return (
    <section>
      <h4>Sådan skriver du</h4>
      <h5>Kode</h5>
      <pre>
        ```python{"\n"}
        din kode{"\n"}
        ```
      </pre>
      <h5>Fed tekst</h5>
      <pre>her kommer **fed** tekst</pre>

      <Button size="small" color="primary" variant="raised" onClick={onClose}>
        Luk
      </Button>
    </section>
  );
}
