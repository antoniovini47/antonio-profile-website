import { useState, useEffect } from "react";
import "./App.css";
import { requestLinkedInData } from "./services/requestLinkedInProfileData";
import rawData from "./assets/dataProfileRaw";

function App() {
  // Main data
  const [profileData, setProfileData] = useState<any>("");

  // Informations used in the profile
  const [profileName, setProfileName] = useState<string>("Getting LinkedIn data...");

  // Called when the component is mounted - Fetches the data for profile
  useEffect(() => {
    console.log("Requesting data...");

    // Fetches the data from the local file for development purposes
    async function fetchDataFromLocalFile() {
      console.log("Fetching data from local file...");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setProfileData(rawData);
      console.log(rawData);
    }

    // Fetches the data from LinkedIn
    async function fetchDataFromLinkedIn() {
      console.log("Fetching data from LinkedIn...");
      await requestLinkedInData()
        .then((request) => {
          console.log(request);
          setProfileData(request);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          console.log("Data fetched!");
        });
    }

    // Chooses the data source depending on the environment
    import.meta.env.DEV ? fetchDataFromLocalFile() : fetchDataFromLinkedIn();
  }, []);

  // TODO: First get all the data from linkedin and saves on local storage, then parse for the view
  // TODO: step by step to create a better user experience, like it was requesting each information
  //Called when the profileData is updated - Updates the data on the website
  useEffect(() => {
    setProfileName(profileData.firstName + " " + profileData.lastName);
  }, [profileData]);

  return (
    <>
      <h1>{profileName}</h1>
    </>
  );
}

export default App;
