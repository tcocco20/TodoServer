import { forwardRef, type MouseEvent, type ReactNode, type Ref } from "react";

const UserDropdownToggle = forwardRef(
  (
    {
      children,
      onClick,
    }: { children: ReactNode; onClick: (e: MouseEvent) => void },
    ref: Ref<HTMLButtonElement>
  ) => {
    return (
      <button
        style={{
          backgroundColor: "transparent",
          padding: 0,
        }}
        className="border-0"
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
      >
        {children}
      </button>
    );
  }
);

export default UserDropdownToggle;
