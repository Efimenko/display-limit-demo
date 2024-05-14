import { useRef } from "react";

let mounts: Record<PropertyKey, number> = {};

const repeatedMountsCountInStrictMode =
  process.env.NODE_ENV === "development" ? 2 : 1;

const useRenderCount = () => {
  const renderCountRef = useRef(0);

  return (renderCountRef.current += 1);
};

const useMountCount = (id: PropertyKey) => {
  const wasMountCountedRef = useRef(false);

  const wasMountCounted = wasMountCountedRef.current;

  if (!wasMountCounted) {
    mounts[id] = (mounts[id] ?? 0) + 1;

    wasMountCountedRef.current = true;
  }

  return mounts[id] / repeatedMountsCountInStrictMode;
};

export const Unit = ({
  title,
  id,
}: {
  title: string;
  id: string;
}): React.ReactNode => {
  const renderCount = useRenderCount();

  const mountCount = useMountCount(id);

  return (
    <div className="unit">
      <h2 className="unit-title">{title}</h2>
      <ul className="unit-meta">
        <li>Render times: {renderCount}</li>
        <li>Mount times: {mountCount}</li>
      </ul>
    </div>
  );
};
