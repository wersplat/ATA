import axios from 'axios';
import Papa from 'papaparse';

export async function fetchSheetData(url) {
  if (!url) return [];

  const response = await axios.get(url, {
    timeout: 10000,
    responseType: 'text',
  });

  const parsed = Papa.parse(response.data, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.trim(),
  });

  if (parsed.errors.length > 0) {
    console.warn('CSV parse warnings:', parsed.errors);
  }

  return parsed.data;
}
