import axios from 'axios'

export const useRequest = () => {
    const makeRequest = async (options) => {
        try {
            const response = await axios(options.config)
            const { data } = response
            return data
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return error.response.data
            }
            throw new Error(error.message)
        }
    }

    const getRecognition = async (base64image, setResponse) => {
        const config = {
            url: "http://localhost:5000/emotion-recognition",
            method: "POST",
            data: {
                image: base64image
            }
        }

        const response = await makeRequest({config})
        setResponse(response)
    }

    const saveData = async (data, id) => {
        const config = {
            url: "http://localhost:5000/save-data",
            method: "POST",
            data: {
                id,
                data,
            }
        }

        await makeRequest({config})
    }

    return {
        getRecognition,
        saveData
    }
}
