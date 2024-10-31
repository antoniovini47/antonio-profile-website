import { useState, useEffect } from "react";
import "./App.css";
import { requestLinkedInData } from "./services/requestLinkedInProfileData";
import { data } from "./assets/dataProfileRaw";

function requestLocalData() {
  return data;
}

function App() {
  const [profileName, setProfileName] = useState<string>("Getting LinkedIn data...");

  useEffect(() => {
    console.log("Requesting data from LinkedIn...");

    // ! This is a fake data for testing purposes - change it to the real data before deploying
    // ! const profileData = requestLinkedInData();
    // ! Set timeout to simulate the request waiting time

    setTimeout(() => {
      const profileData = requestLocalData();
      setProfileName(profileData.firstName + " " + profileData.lastName);
    }, 1000);
  }, []);

  return (
    <>
      <h1>{profileName}</h1>
      <div className="card">
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
