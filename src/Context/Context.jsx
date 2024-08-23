import { createContext, useState, useEffect } from "react";

export const MyContext = createContext();

export function DataContextProvider({ children }) {
  const [words, setWords] = useState([]);
  const [servState, setServState] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  function handleLoadingTrue() {
    setIsLoading(true);
  }

  function handleLoadingFalse() {
    setIsLoading(false);
  }

  function handleServ() {
    setServState(servState + 1);
  }

  function removeItem(id) {
    handleLoadingTrue();
    fetch(`api/words/${id}/delete`, { method: "POST" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Server response ne ok");
        }
        handleServ();
        handleLoadingFalse();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function saveEditWords(id, english, transcription, russian) {
    handleLoadingTrue();
    fetch(`/api/words/${id}/update`, {
      method: "POST",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        id: id,
        english: english,
        transcription: transcription,
        russian: russian,
        tags: "",
        tags_json: "",
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Server response ne ok");
        }
        handleServ();
        handleLoadingFalse();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function addWord(englishState, transcriptionState, russianState) {
    handleLoadingTrue();
    fetch("/api/words/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        english: englishState,
        transcription: transcriptionState,
        russian: russianState,
        tags: "",
        tags_json: "",
      }),
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response);
        }
        handleServ();
        handleLoadingFalse();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    fetch("http://itgirlschool.justmakeit.ru/api/words")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        return response.json();
      })
      .then((response) => {
        setWords(response);
        handleLoadingFalse();
      })
      .catch((error) => console.log(error));
  }, [servState]);

  const value = { words, isLoading, handleServ, removeItem, saveEditWords, addWord };

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
}