export function PrimaryButton({
  children,
  onClick,
  className,
  type = 'button',
  disabled = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      className={`primary-btn h-[35px] text-sm ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({
  children,
  onClick,
  className,
  disabled = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      className={`secondary-btn h-[35px] text-[13px] ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
