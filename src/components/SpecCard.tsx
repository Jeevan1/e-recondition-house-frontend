export const SpecCard = ({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string | number;
  icon?: React.ElementType;
}) => {
  return (
    <li className="flex items-center justify-between gap-2">
      <span className="flex items-center gap-2">
        {Icon && <Icon className="text-md inline text-primary" />}
        <span className="text-sm font-semibold text-gray-600">{title} :</span>
      </span>
      <span className="text-sm font-semibold text-primary">{value}</span>
    </li>
  );
};
