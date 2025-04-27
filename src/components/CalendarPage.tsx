import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { DateTime } from 'luxon';
import 'react-datepicker/dist/react-datepicker.css';
import { TimezoneSelect } from './TimezoneSelect';

const today = new Date();
const maxPastDate = new Date();
maxPastDate.setDate(today.getDate() - 90);

const specialDates: { [key: string]: { message: string; disabled: boolean } } = {
  "2025-05-10": { message: "Special Discount Day!", disabled: false },
  "2025-05-15": { message: "Holiday - No Orders", disabled: true }
};

interface Props {
  onDateRangeChange: (range: { start: Date; end: Date }, timezone: string) => void;
}

export const CalendarPage: React.FC<Props> = ({ onDateRangeChange }) => {
  const [startDate, setStartDate] = useState<Date>(new Date(new Date().setDate(new Date().getDate() - 7)));
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [timezone, setTimezone] = useState<string>('Europe/Moscow');
  const maxRangeDays = 10;

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;

    if (start && end) {
      const diffDays = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);
      if (diffDays > maxRangeDays) {
        alert(`Cannot select range more than ${maxRangeDays} days!`);
        return;
      }
    }

    if (start) setStartDate(start);
    if (end) setEndDate(end);

    if (start && end) {
      onDateRangeChange({ start, end }, timezone);
    }
  };

  const isDateDisabled = (date: Date) => {
    const formatted = DateTime.fromJSDate(date).toISODate();
    if (!formatted) return false;
    return (
      specialDates[formatted]?.disabled ||
      date < maxPastDate ||
      date > new Date()
    );
  };

  const renderDayContents = (day: number, date: Date) => {
    const formatted = DateTime.fromJSDate(date).toISODate();
    if (!formatted) return day;

    const message = specialDates[formatted]?.message;
    return (
      <div title={message || ''} className={formatted === DateTime.now().toISODate() ? 'bg-yellow-200' : ''}>
        {day}
      </div>
    );
  };

  return (
    <div className="p-4 border rounded shadow mb-6">
      <TimezoneSelect selectedTimezone={timezone} onChange={setTimezone} />
      <div className="text-sm text-gray-500 mb-2">
        Cannot select range more than {maxRangeDays} days
      </div>
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        showDisabledMonthNavigation
        filterDate={(date) => !isDateDisabled(date)}
        renderDayContents={renderDayContents}
        inline
      />
    </div>
  );
};
