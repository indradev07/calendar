import React, { useState, useEffect } from 'react';
import { fetchDummyData, RowData } from '../api/fetchData';

interface Props {
  dateRange: { start: Date; end: Date };
  timezone: string;
}

export const TablePage: React.FC<Props> = ({ dateRange, timezone }) => {
  const [data, setData] = useState<RowData[]>([]);
  const [sortColumn, setSortColumn] = useState<keyof RowData>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const result = await fetchDummyData(dateRange, timezone);
      setData(result);
      setLoading(false);
    }
    loadData();
  }, [dateRange, timezone]);

  const handleSort = (col: keyof RowData) => {
    if (col === sortColumn) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(col);
      setSortOrder('asc');
    }
  };

  const filteredData = data.filter(row =>
    row.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    const aVal = a[sortColumn];
    const bVal = b[sortColumn];
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortOrder === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    }
    return 0;
  });

  return (
    <div className="p-4 border rounded shadow">
      <input
        type="text"
        placeholder="Search by Name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded p-2 mb-4 w-full"
      />

      {loading ? (
        <div className="text-center py-10">Loading data...</div>
      ) : (
        <table className="w-full text-left border">
          <thead>
            <tr>
              {['name', 'date', 'amount', 'status'].map(col => (
                <th
                  key={col}
                  onClick={() => handleSort(col as keyof RowData)}
                  className="cursor-pointer border p-2 bg-gray-100 hover:bg-gray-200"
                >
                  {col.toUpperCase()} {sortColumn === col ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, idx) => (
              <tr key={idx} className="border-t hover:bg-gray-50">
                <td className="p-2">{row.name}</td>
                <td className="p-2">{row.date}</td>
                <td className="p-2">{row.amount}</td>
                <td className="p-2">{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
