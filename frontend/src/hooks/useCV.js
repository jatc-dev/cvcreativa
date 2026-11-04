import { useState } from "react";

export function useCV(initial = {}) {
  const [data, setData] = useState(initial);

  const setField = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const reset = () => setData(initial);

  return { data, setField, setData, reset };
}