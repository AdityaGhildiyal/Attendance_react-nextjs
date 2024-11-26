/**
 * Formats a time string to ensure consistent AM/PM format
 * @param {string} timeString - Time string to format (e.g., "9:00 am" or "09:00 AM")
 * @returns {string} - Formatted time string with consistent AM/PM format
 */
export function formatTimeString(timeString) {
  // Convert to uppercase AM/PM format
  const formattedTime = timeString.replace(/([ap])\.?m\.?/i, (match) => {
    return match.toUpperCase();
  });
  
  // Ensure hours are padded with leading zeros
  return formattedTime.replace(/\b\d{1}:/g, (match) => {
    return `0${match}`;
  });
}

/**
 * Formats a time range string to ensure consistent AM/PM format
 * @param {string} timeRangeString - Time range string to format (e.g., "9:00 am - 10:00 am")
 * @returns {string} - Formatted time range string with consistent AM/PM format
 */
export function formatTimeRangeString(timeRangeString) {
  return timeRangeString.split(' - ')
    .map(time => formatTimeString(time))
    .join(' - ');
}
