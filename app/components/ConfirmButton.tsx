import { useCallback, useEffect, useRef, useState } from "react";

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

interface Props extends Omit<ButtonProps, "onClick"> {
  onConfirm(): void;
  pendingMessage?: string;
}

/** It requires two clicks to get anything done */
const ConfirmButton: React.FC<Props> = ({
  onConfirm,
  children,
  pendingMessage = "Are you sure?",
  ...props
}) => {
  const [pending, setPending] = useState(false);
  const t = useRef<number>();

  const handleClick = useCallback(() => {
    window.clearInterval(t.current);
    if (pending) {
      onConfirm();
    } else {
      setPending(true);

      t.current = window.setTimeout(() => {
        setPending(false);
      }, 3000);
    }
  }, [onConfirm, pending]);

  useEffect(() => {
    return () => {
      window.clearInterval(t.current);
    };
  }, [t]);

  return (
    <button {...props} onClick={handleClick} type="button">
      {pending ? pendingMessage : children}
    </button>
  );
};

export default ConfirmButton;
