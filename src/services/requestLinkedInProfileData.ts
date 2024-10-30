import axios from "axios";

const options = {
  method: "GET",
  url: "https://li-data-scraper.p.rapidapi.com/get-profile-data-by-url",
  params: {
    url: "https://www.linkedin.com/in/antoniovini47/",
  },
  headers: {
    "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
    "x-rapidapi-host": "li-data-scraper.p.rapidapi.com",
  },
};

try {
  const response = await axios.request(options);
  console.log(response.data);
} catch (error) {
  console.error(error);
}
