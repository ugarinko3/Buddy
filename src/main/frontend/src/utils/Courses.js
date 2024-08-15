import axios from "axios"

export async function getPostCourses() {
    try {
        const response = await axios.create.get(`/courses`)
        return response.data
    } catch (error) {
        throw error
    }
}