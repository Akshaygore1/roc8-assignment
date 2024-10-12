import { useState } from "react";
import { Outlet } from "react-router-dom";
import FilterComponent from "./component/ui/FilterComponent";

function App() {
  const [filter, setFilter] = useState<string | null>(null);

  const handleFilterChange = (newFilter: string) => {
    setFilter((prevFilter) => (prevFilter === newFilter ? null : newFilter));
  };

  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="flex flex-row items-center py-4">
        <div className="pr-2">Filter By:</div>
        <div className="flex flex-row gap-1">
          <FilterComponent
            title="Unread"
            onClick={() => handleFilterChange("unread")}
            active={filter === "unread"}
          />
          <FilterComponent
            title="Read"
            onClick={() => handleFilterChange("read")}
            active={filter === "read"}
          />
          <FilterComponent
            title="Favorites"
            onClick={() => handleFilterChange("favorites")}
            active={filter === "favorites"}
          />
        </div>
      </div>

      <Outlet context={{ filter }} />
    </div>
  );
}

export default App;
