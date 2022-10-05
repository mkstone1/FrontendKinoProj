export const kinoUrlScreenings = "http://localhost:8080/api/screenings"
export const kinoUrlTheaters = "http://localhost:8080/api/theaters"

export async function handleHttpErrors(res) {
    if (!res.ok) {
        const errorResponse = await res.json();
        const error = new Error(errorResponse.message)
        error.apiError = errorResponse
        throw error
    }
    return res.json()
}