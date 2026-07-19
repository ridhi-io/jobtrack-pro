function StatusFilter({ statusFilter, setStatusFilter }) {
  return (
    <select
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
      className="
        p-3
        rounded-xl
        border
        border-gray-300
        dark:border-gray-700
        bg-white
        dark:bg-gray-800
        text-gray-800
        dark:text-white
        shadow-sm
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        transition-all
        duration-300
      "
    >
      <option value="All">All Status</option>
      <option value="Applied">Applied</option>
      <option value="Interview">Interview</option>
      <option value="Offer">Offer</option>
      <option value="Rejected">Rejected</option>
      <option value="Wishlist">Wishlist</option>
    </select>
  );
}

export default StatusFilter;