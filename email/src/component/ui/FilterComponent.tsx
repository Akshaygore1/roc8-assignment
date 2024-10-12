function FilterComponent({
  title,
  onClick,
}: {
  title: string;
  onClick: () => void;
}) {
  return (
    <div
      className="hover:cursor-pointer px-3 py-1 rounded-full border border-transparent hover:border-border hover:bg-filter-button text-black transition-colors duration-300"
      onClick={onClick}
    >
      {title}
    </div>
  );
}

export default FilterComponent;
