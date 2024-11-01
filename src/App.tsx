import { useState, useEffect } from "react";
import "./App.css";
import { defaultValues } from "./types/defaultValues";
import { requestLinkedInData } from "./services/requestLinkedInProfileData";
import rawData from "./assets/dataProfileRaw";
import { Button } from "./components/ui/button";
import { Avatar, AvatarImage } from "./components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";
import { supportedLocales } from "./types/supportedLocales";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

function App() {
  // Main variables
  const [profileData, setProfileData] = useState<any>("");
  // TODO: get and choose the language from the browser
  const [supportedLocales, setSupportedLocales] = useState<supportedLocales[]>([]);
  const [language, setLanguage] = useState("en");

  // Profile variables
  const [profileName, setProfileName] = useState<string>("Getting LinkedIn data...");
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [headline, setHeadline] = useState<string>("Getting headline...");

  // Called when the component is mounted - Fetches the data for profile
  useEffect(() => {
    console.log("Requesting data...");

    // Fetches the data from the local file for development purposes
    async function fetchDataFromLocalFile() {
      console.log("Fetching data from local file...");
      await new Promise((resolve) => setTimeout(resolve, 1000));
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

  //Called when the profileData or the language is updated - Updates the data on the website
  useEffect(() => {
    if (!profileData) return;
    setProfileName(
      profileData.multiLocaleFirstName[language] + " " + profileData.multiLocaleLastName[language]
    );
    setProfilePicture(profileData.profilePicture);
    setSupportedLocales(profileData.supportedLocales);
    setHeadline(profileData.multiLocaleHeadline[language]);
    console.log(profileData.multiLocaleHeadline[language]);
  }, [profileData, language]);

  // TODO: Create skeleton loading for the profile
  // TODO: Create a language selector en/pt
  // TODO: Create a theme selector light/dark
  return (
    <>
      <Select
        onValueChange={(value) => {
          setLanguage(value);
          console.log(value);
        }}>
        <SelectTrigger className="w-[150px] h-[50px]">
          <SelectValue
            placeholder={
              <div className="flex gap-2">
                <img
                  className="h-5 w-5 rounded-full"
                  src={`https://flagicons.lipis.dev/flags/1x1/us.svg`}
                />
                <p>en - US</p>
              </div>
            }></SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {supportedLocales &&
              supportedLocales.map((locale: supportedLocales) => (
                <SelectItem key={`si${locale.country}`} value={locale.language}>
                  <div className="flex gap-2">
                    <img
                      className="h-5 w-5 rounded-full"
                      src={`https://flagicons.lipis.dev/flags/1x1/${locale.country.toLowerCase()}.svg`}
                    />
                    <p>
                      {locale.language} - {locale.country}
                    </p>
                  </div>
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {profileData ? (
        <Avatar
          className={`w-${defaultValues.profilePictureSize} h-${defaultValues.profilePictureSize}`}>
          <AvatarImage
            src={profilePicture}
            // TODO: Create a onClick function to open the image in a modal
          />
        </Avatar>
      ) : (
        <Skeleton
          className={`w-${defaultValues.profilePictureSize} h-${defaultValues.profilePictureSize} rounded-full`}
        />
      )}
      {profileData ? <h1>{profileName}</h1> : <Skeleton className="w-[500px] h-[80px]" />}
      {profileData ? (
        <h2>{headline}</h2>
      ) : (
        <Skeleton className="w-[500px] h-[40px] margin-top-40" />
      )}
      <Separator />
    </>
  );
}

export default App;
