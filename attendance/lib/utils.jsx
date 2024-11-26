import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merge class names using clsx and tailwind-merge
 * @param  {...string} inputs - Class names to merge
 * @returns {string} - Merged class names
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Generate a unique ID
 * @returns {string} - Unique ID
 */
export function generateId() {
  return Math.random().toString(36).substr(2, 9)
}

/**
 * Check if an element is partially visible in the viewport
 * @param {HTMLElement} el - The element to check
 * @returns {boolean} - True if the element is partially visible
 */
export function isElementPartiallyVisible(el) {
  if (!el) return false;
  const rect = el.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
  const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

  return vertInView && horInView;
}

/**
 * Debounce a function
 * @param {Function} func - The function to debounce
 * @param {number} wait - The debounce wait time in milliseconds
 * @returns {Function} - Debounced function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Format a date string
 * @param {string} dateString - The date string to format
 * @returns {string} - Formatted date string
 */
export function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

/**
 * Truncate a string to a specified length
 * @param {string} str - The string to truncate
 * @param {number} length - The maximum length of the string
 * @returns {string} - Truncated string
 */
export function truncateString(str, length) {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}
