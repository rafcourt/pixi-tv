const PROTOCOLS = {
    open:'http://',
    secure:'https://'
};
const HOSTS = {
    dev: `${PROTOCOLS.secure}api.themoviedb.org/3`,
    stage: `${PROTOCOLS.secure}api.themoviedb.org/3`,
    prod: `${PROTOCOLS.secure}api.themoviedb.org/3`,
};
const ENV = "dev";//get value from dotenv
const ENDPOINTS = {
    config: `${HOSTS[ENV]}/configuration`,
    trendingMovies: `${HOSTS[ENV]}/trending/movie/day?language=en-US`,
    trendingShows: `${HOSTS[ENV]}/trending/tv/day?language=en-US`,
    searchMovies: `${HOSTS[ENV]}/search/movie?include_adult=false&language=en-US&page=1`,
    searchShows: `${HOSTS[ENV]}/search/tv?include_adult=false&language=en-US&page=1`,
    detailsTV:`${HOSTS[ENV]}/tv/[id]?language=en-US`,
    detailsMovie:`${HOSTS[ENV]}/movie/[id]?language=en-US`,
};

export default function Url(endpointIdentifier) {
    return ENDPOINTS[endpointIdentifier];
}