import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat);

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
/**
 * Calculate the file size when size in bytes
 * @param bytes number
 * @param opts 
 * @returns string
 */
export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number
    sizeType?: "accurate" | "normal"
  } = {}
): string {
  const { decimals = 0, sizeType = "normal" } = opts

  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"]
  if (bytes === 0) return "0 Byte"
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${sizeType === "accurate" ? accurateSizes[i] ?? "Bytest" : sizes[i] ?? "Bytes"
    }`
}

/**
 * Converts a given UTC date to the local time zone and formats it into a specified string format.
 *
 * @param {Date | string | number} date - The UTC date to format. Can be a Date object, a string, or a timestamp.
 * @param {string} [format='MMM D, YYYY, h:mm A'] - The format string to use for formatting the date.
 * @returns {string} - The formatted date string in the local time zone.
 * @throws {Error} - Throws an error if the input date is invalid.
 */
export function formatDate(date: Date | string | number, format: string = 'MMM D, YYYY, hh:mm A'): string {
  // Check if the input is a valid date instance
  if (!dayjs(date).isValid()) {
    throw new Error('Invalid date');
  }
  // Convert the date from UTC to local time and format it
  return dayjs(date).format(format);
}