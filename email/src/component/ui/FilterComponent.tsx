function FilterComponent({
  title,
  onClick,
  active,
}: {
  title: string;
  onClick: () => void;
  active: boolean;
}) {
  return (
    <div
      className={`hover:cursor-pointer px-3 py-1 rounded-full border border-transparent hover:border-border hover:bg-filter-button text-black transition-colors duration-300 ${
        active ? "bg-filter-button border-border" : ""
      }`}
      onClick={onClick}
    >
      {title}
    </div>
  );
}

export default FilterComponent;
