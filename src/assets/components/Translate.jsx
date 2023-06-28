import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

const Translate = () => {
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  useEffect(() => {
    fetchLanguages();
  }, []);

  const fetchLanguages = async () => {
    try {
      const response = await axios.get(
        "https://api.cognitive.microsofttranslator.com/languages?api-version=3.0"
      );
      const data = response.data.translation;
      const languageList = Object.entries(data).map(([code, name]) => ({
        value: code,
        label: name.name,
      }));
      setLanguages(languageList);
    } catch (error) {
      console.log("Error fetching languages:", error);
    }
  };

  const handleLanguageChange = (selectedOption) => {
    setSelectedLanguage(selectedOption);
  };

  return (
    <>
      <main id="main">
        <aside>
          <div id="asideHead">
            <Select
              options={languages}
              value={selectedLanguage}
              onChange={handleLanguageChange}
              placeholder="Select a language"
            />

            <span>No of Char</span>

            <i className="fa-solid fa-paste"></i>

            <i className="fa-solid fa-volume-high"></i>

            <i className="fa-regular fa-clipboard"></i>
          </div>

          <textarea name="" id="" placeholder="Enter your text"></textarea>
        </aside>
        <aside></aside>
      </main>
    </>
  );
};

export default Translate;
