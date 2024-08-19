import axios from "axios"

export async function getPostCourses() {
    try {
        const response = await axios.create.post(`/post`)
        return response.data
    } catch (error) {
        throw error
    }
}