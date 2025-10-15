import axios from "axios"

const commonAPI = async (httpMethod, URL, reqBody, reqHeader) => {
    const reqConfig = {
        method: httpMethod,
        url: URL,
        data: reqBody,
        headers: reqHeader ? reqHeader : { "Content-Type": "application/json" }
    }
    return await axios(reqConfig).then(res => {
        return res
    }).catch(err => {
        return err
    })
}

export default commonAPI