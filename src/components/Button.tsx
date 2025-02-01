export function PrimaryButton({
  children,
  onClick,
  className,
  type = 'button',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'submit' | 'reset' | 'button';
}) {
  return (
    <button
      type={type}
      className={`primary-btn h-[35px] text-[13px] ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      className={`secondary-btn h-[35px] text-[13px] ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
