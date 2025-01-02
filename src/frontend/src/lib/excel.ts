import * as XLSX from "xlsx";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const downloadExcel = (data: any[], name: string) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, `${name}`);
  XLSX.writeFile(workbook, `${name}.xlsx`);
};
