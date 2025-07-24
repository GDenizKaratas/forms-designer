export const startViewTransition = (
  callback: () => void,
  options?: { skipTransition?: boolean }
) => {
  // Skip transition for performance-critical operations
  if (options?.skipTransition || !document.startViewTransition) {
    callback();
    return;
  }

  // Use requestAnimationFrame for better timing
  requestAnimationFrame(() => {
    const transition = document.startViewTransition(callback);

    // Optional: Add timeout to prevent hanging transitions
    const timeout = setTimeout(() => {
      console.warn('View transition taking longer than expected');
    }, 1000);

    transition.finished.finally(() => {
      clearTimeout(timeout);
    });
  });
};
