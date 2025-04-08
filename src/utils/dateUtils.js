export function formatDate(timestamp) {
    const date = new Date(timestamp)
    const options = {
        weekday: "long",
        month: "long",
        day: "numeric",
    }
    return date.toLocaleDateString("en-US", options)
}

export function formatTime(timestamp) {
    const date = new Date(timestamp)
    return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    })
}