import { DateTime } from 'luxon';

export interface RowData {
  name: string;
  date: string;
  amount: number;
  status: string;
}

export async function fetchDummyData(dateRange: { start: Date, end: Date }, timezone: string): Promise<RowData[]> {
  const start = DateTime.fromJSDate(dateRange.start).setZone(timezone).toFormat("yyyy-LL-dd HH:mm:ss ZZZZ");
  const end = DateTime.fromJSDate(dateRange.end).setZone(timezone).toFormat("yyyy-LL-dd HH:mm:ss ZZZZ");

  console.log("Fetching data from", start, "to", end);

  await new Promise(resolve => setTimeout(resolve, 1000)); // simulate API delay

  return [
    { name: "John Doe", date: start, amount: 120, status: "Paid" },
    { name: "Jane Smith", date: end, amount: 150, status: "Pending" },
    { name: "Sam Wilson", date: start, amount: 90, status: "Paid" },
    { name: "Lisa Ray", date: end, amount: 110, status: "Failed" },
  ];
}
