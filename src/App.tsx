import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Logo } from "./components/Logo";

interface Article {
  text: string;
  image: string;
}

const App: React.FC = () => {
  const [text, setText] = useState("");
  const [article, setArticle] = useState<string | null>(null);
  const [images, setImages] = useState<string[] | null>(null);
  const [title, setTitle] = useState("");

  const search = () => {
    fetch(
      `https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&prop=extracts&titles=${text}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setArticle(data.query.pages[Object.keys(data.query.pages)[0]].extract);
        getImages();
        setText("");
        setTitle(data.query.pages[Object.keys(data.query.pages)[0]].title);
      });
  };

  const getImages = () => {
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${text}`)
      .then((res) => res.json())
      .then((data) => setImages([data.thumbnail.source]));
  };

  return (
    <div className="App">
      <Logo />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          search();
        }}
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          width: "50%",
          marginLeft: "25%",
          marginBottom: "1rem",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#FFDF2B" }}>
          Enter any medical term
        </h2>
        <div style={{ width: "100%" }}>
          <input
            className="search-input"
            placeholder="Medical term"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <button className="search-button">Search</button>
        </div>
      </form>
      <div>
        {article && images !== null ? (
          <div
            style={{
              width: "100%",
              display: "flex",
            }}
          >
            <div
              style={{
                width: "70%",
                height: `${window.innerHeight * 0.9}px`,
                overflowY: "scroll",
                color: "#F9FFFF",
                fontFamily: "Segoe UI",
                boxShadow:
                  "0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08)",
              }}
            >
              <h1 style={{ textAlign: "center" }}>{title}</h1>
              <div dangerouslySetInnerHTML={{ __html: article }}></div>
            </div>

            <div
              style={{
                position: "fixed",
                top: "30%",
                right: "0px",
                width: "25%",
              }}
            >
              {images.map((image) => (
                <img
                  src={image}
                  key={image}
                  style={{ width: "100%", height: "100%" }}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default App;
