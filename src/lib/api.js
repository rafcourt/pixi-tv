import Url from './endpoints.js';
const auth = ''
async function get({
    endpointIdentifier, 
    queryParams, 
    pathId
}){
    const headers = {
        'Authorization': `Bearer ${auth}`
    };
    let url = Url(endpointIdentifier);
    url = pathId ? url.replace('[id]', pathId) : url;
    const additionalParameters = queryParams?.map((param)=> `&${param.key}=${param.value}`)||'';
    const response = await fetch(url+additionalParameters, {headers});
    return response.json()
}
const API = {get}
export default API