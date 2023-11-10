import axios from 'axios'

export const useRequest = () => {

    const mockUrl = "https://practicainvestigativauv.free.beeceptor.com";

    const makeRequest = async (options) => {
        try {
            const response = await axios(options.config)
            return response
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return error.response.data
            }
            throw new Error(error.message)
        }
    }

    const signIn = async (data, setResponse) => {
        const config = {
            url: `${mockUrl}/signin`,
            method: "POST",
            data: data
        }

        const response = await makeRequest({config})
        setResponse(response)
    }

    const signUp = async (data, setResponse) => {
        const config = {
            url: `${mockUrl}/signup`,
            method: "POST",
            data: data
        }

        const response = await makeRequest({config})
        setResponse(response)
    }

    const updateProfile = async (data, setResponse) => {
        const config = {
            url: `${mockUrl}/updateprofile`,
            method: "POST",
            data: data
        }

        const response = await makeRequest({config})
        setResponse(response)
    }

    return {
        signIn,
        signUp,
        updateProfile
    }
}
