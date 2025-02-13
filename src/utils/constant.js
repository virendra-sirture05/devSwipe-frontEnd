// const BASE_URL = "http://localhost:3000"
const BASE_URL = location.hostname === "localhost" ? "http://localhost:7777" : "/api";

export default BASE_URL