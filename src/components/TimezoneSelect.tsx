import React from 'react';

const timezones = [
  "UTC",
  "Asia/Kolkata",
  "Asia/Dubai",
  "Europe/Moscow",
  "America/New_York",
  "Asia/Tokyo"
];

interface Props {
  selectedTimezone: string;
  onChange: (tz: string) => void;
}

export const TimezoneSelect: React.FC<Props> = ({ selectedTimezone, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">Select Timezone</label>
      <select
        value={selectedTimezone}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded p-2 w-full"
      >
        {timezones.map(tz => (
          <option key={tz} value={tz}>{tz}</option>
        ))}
      </select>
    </div>
  );
};
