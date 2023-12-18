import axios from 'axios'

export const useRequest = () => {

    const mockUrl = "http://localhost:5000";

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

    const fetchChart = async (id, setResponse) => {
        const config = {
            url: `${mockUrl}/fetchchart/${id}`,
            method: "GET"
        }

        const response = await makeRequest({ config })
        setResponse(response)
    }

    const fetchPie = async (id, setResponse) => {
        const config = {
            url: `${mockUrl}/fetchpie/${id}`,
            method: "GET"
        }

        const response = await makeRequest({ config })
        setResponse(response)
    }

    return {
        fetchChart,
        fetchPie
    }
}
