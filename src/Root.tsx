import { useState } from "react";
import { Unit } from "./Unit";

const ToggleChildren = ({ children }: { children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div>
      <button onClick={() => setIsVisible((prev) => !prev)}>
        Toggle children
      </button>
      {isVisible ? children : null}
    </div>
  );
};

const UpdateChildren = ({ children }: { children: () => React.ReactNode }) => {
  const [, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount((prev) => prev + 1)}>
        Update children
      </button>
      {children()}
    </div>
  );
};

export const Root = () => {
  return (
    <div className="root">
      <div className="units">
        <ToggleChildren>
          <UpdateChildren>
            {() => <Unit title="Unit foo" id="unit-foo" />}
          </UpdateChildren>
        </ToggleChildren>
        <ToggleChildren>
          <UpdateChildren>
            {() => <Unit title="Unit bar" id="unit-bar" />}
          </UpdateChildren>
        </ToggleChildren>
      </div>
    </div>
  );
};
