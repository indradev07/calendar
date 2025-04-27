import React, { useState } from 'react';
import { CalendarPage } from './components/CalendarPage';
import { TablePage } from './components/TablePage';

const App: React.FC = () => {
  const [dateRange, setDateRange] = useState<{ start: Date, end: Date }>({
    start: new Date(new Date().setDate(new Date().getDate() - 7)),
    end: new Date()
  });
  const [timezone, setTimezone] = useState<string>('Europe/Moscow');

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Calendar + Table App</h1>
      <CalendarPage onDateRangeChange={(range, tz) => {
        setDateRange(range);
        setTimezone(tz);
      }} />
      <TablePage dateRange={dateRange} timezone={timezone} />
    </div>
  );
};

export default App;
