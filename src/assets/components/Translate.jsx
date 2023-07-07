import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Select from "react-select";

const Translate = () => {
  // State variables
  const [languages, setLanguages] = useState([]); // List of available languages
  const [selectedLanguage, setSelectedLanguage] = useState(null); // Currently selected language
  const [selectedLanguage2, setSelectedLanguage2] = useState(null);
  const textareaRef = useRef(null); // Reference to the textarea element
  const [messages, setMessages] = useState(""); // Message to display
  const [testToTranslate, setTestToTranslate] = useState("");
  const [selectedLangCode, setSelectedLangCode] = useState('')
  const [selectedLangCode2, setSelectedLangCode2] = useState('')
  const [translateOutput, setTranslateOutput] = useState('')

  // Fetches the list of languages from the API
  const fetchLanguages = async () => {
    try {
      const response = await axios.get(
        "https://api.cognitive.microsofttranslator.com/languages?api-version=3.0"
      );
      const data = response.data.translation;
      // Transform the language data into an array of objects with 'value' and 'label' properties
      const languageList = Object.entries(data).map(([code, name]) => ({
        value: code,
        label: name.name
      }));
      setLanguages(languageList);

    } catch (error) {
      console.log("Error fetching languages:", error);
    }
  };

  // Triggered when the component mounts, fetches the languages
  useEffect(() => {
    fetchLanguages();
  }, []);

  // Handles the language selection change
  const handleLanguageChange = (selectedOption) => {
    setSelectedLanguage(selectedOption);
    setSelectedLangCode(selectedOption.value);
  };

  const handleLanguageChange2 = (selectedOption) => {
    setSelectedLanguage2(selectedOption);
    setSelectedLangCode2(selectedOption.value);
  };

  // Handles the click event when the copy button is clicked
  const handleCopyClick = () => {
    const textToCopy = textareaRef.current.value;
    copyToClipboard(textToCopy);
  };

  // Copies the provided text to the clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setMessages(`Text copied to clipboard successfully.`);
      })
      .catch((err) => {
        setMessages(`Error in copying text to clipboard: ${err}`);
      });
  };

  const encodedParams = new URLSearchParams();
  encodedParams.set("q", testToTranslate);
  encodedParams.set("target", selectedLangCode2);
  // encodedParams.set("source", selectedLangCode);

  const options = {
    method: "POST",
    url: "https://google-translate1.p.rapidapi.com/language/translate/v2",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "79089f9abcmsh3fe1a91daa6f3f6p15a765jsnb3246a8beb6d",
      "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
    },
    data: encodedParams,
  };

  const translate = async () => {
    try {
      const response = await axios.request(options);
      setTranslateOutput(response.data.data.translations[0].translatedText);
      setMessages('Translated Successfully')
    } catch (error) {
      setMessages('Target language not selected or API Request is limited')
    }
  };

  return (
    <>
      <div id="msgDiv">{messages}</div>
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

            <i className="fa-solid fa-paste" onClick={handleCopyClick}></i>

            <i className="fa-solid fa-volume-high"></i>

            <i className="fa-regular fa-clipboard"></i>
          </div>

          <textarea
            name=""
            ref={textareaRef}
            onChange={(e) => setTestToTranslate(e.target.value)}
            id=""
            placeholder="Enter your text"
          />
        </aside>

        <i className="fa-sharp fa-solid fa-hands" onClick={translate}></i>

        <aside>
          <div id="asideHead">
            <Select
              options={languages}
              value={selectedLanguage2}
              onChange={handleLanguageChange2}
              placeholder="Select a language"
            />

            <span>No of Char</span>

            <i className="fa-solid fa-paste" onClick={handleCopyClick}></i>

            <i className="fa-solid fa-volume-high"></i>

            <i className="fa-regular fa-clipboard"></i>
          </div>

          <textarea
            name=""
            ref={textareaRef}
            id=""
            value={translateOutput}
            placeholder="Enter your text"
          />
        </aside>
      </main>

    </>
  );
};

export default Translate;
