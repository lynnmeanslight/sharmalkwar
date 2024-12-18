export default function convertNanoseconds(ns) {
    const totalSeconds = Math.floor(ns / 1e9); // Convert nanoseconds to seconds (1 second = 1e9 nanoseconds)
    const minutes = Math.floor(totalSeconds / 60); // Get the total minutes
    const seconds = totalSeconds % 60; // Get the remaining seconds
    return `${minutes} min and ${seconds < 10 ? '0' : ''}${seconds} sec`; // Add leading zero for seconds if needed
}
