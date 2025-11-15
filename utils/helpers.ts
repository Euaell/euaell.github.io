/**
 * Throttle function to limit execution rate
 * @param func - Function to throttle
 * @param wait - Time in milliseconds to wait between executions
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  let lastRan: number | null = null;

  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now();

    if (!lastRan) {
      func.apply(this, args);
      lastRan = now;
    } else {
      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => {
        if (now - (lastRan || 0) >= wait) {
          func.apply(this, args);
          lastRan = now;
        }
      }, wait - (now - lastRan));
    }
  };
}

/**
 * Debounce function to delay execution until after wait time
 * @param func - Function to debounce
 * @param wait - Time in milliseconds to wait
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function (this: any, ...args: Parameters<T>) {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}
