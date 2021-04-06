import React, { useState, useEffect } from "react";
//import "./App.css";

function Joke(props) {
  return (
    <div className="joke">
      <p className="setup">{props.joke.setup}...</p>
      <p className="punchline">{props.joke.punchline}</p>
    </div>
  );
}

// On utilise setJoke() pour mettre à jour le state joke
function App() {
  const [joke, setJoke] = useState({
    setup: ``,
    punchline: ``
  });

  // Il faut charger la première blague des que l'application démarre, nous allons le faire avec useEffect de React, cette fonction sera exécutée à chaque fois que le composant App sera rendu.
  useEffect(() => {
    fetchJoke();
  }, []);

  // J'utilise l'API Fetch de Javascript pour aller récupérer les données
  function fetchJoke() {
    fetch("https://official-joke-api.appspot.com/jokes/programming/random")
      .then(resp => resp.json())
      .then(data => setJoke(data[0]));
  }

  return (
    <>
      <div className="App">
        <Joke joke={joke} />
        <button className="btn" onClick={() => fetchJoke()}>
          another one
        </button>
        <a
          className="tweet btn"
          href={
            "https://twitter.com/intent/tweet?text=" +
            joke.setup +
            " " +
            joke.punchline +
            " &via=alioukahere&hashtags=reactcomedyclub,kaherecode"
          }
          target="_blank"
        >
          tweet
        </a>
        <hr/>
        <div className="back-dashboard">
          <a
            className="btn btn-secondary"
            href={
              "http://demo.local/dashboard/"
            }
          >
            dashboard
          </a>
        </div>
      </div>
      <style jsx="true">{`
        @import url("https://fonts.googleapis.com/css?family=Cormorant|Overpass");

        body {
          background: linear-gradient(to right, #40e0d0, #1bbfaf);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
            "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
            sans-serif, "Overpass";
          padding-top: 50px;
          position: relative;
          display: flex;
          justify-content: center;
        }

        code {
          font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
            monospace;
        }

        .App {
          background-color: #fff;
          padding: 50px;
          border-radius: 5px;
          max-width: 450px;
        }

        .back-dashboard {
          margin-top: 1.35em;
        }

        .joke p.setup {
          text-indent: 3rem;
          position: relative;
        }

        .joke p.setup::before {
          content: open-quote;
          font-size: 5rem;
          font-weight: bold;
          position: absolute;
          left: -3rem;
          top: -1rem;
          color: #1bbfaf;
        }

        .joke p {
          font-size: 1.8rem;
        }

        .joke p.punchline {
          text-transform: uppercase;
          font-weight: bold;
        }

        .btn {
          text-transform: uppercase;
          background: linear-gradient(to right, #40e0d0, #1bbfaf);
          color: #fff;
          border: none;
          border-radius: 0;
          padding: 1rem 2rem;
          cursor: pointer;
          font-weight: bold;
          font-size: 1rem;
          text-decoration: none;
        }

        .btn:focus,
        .btn:active {
          border: none;
          outline: none;
        }

        .btn:active {
          transform: scale(0.98);
        }

        .btn.tweet {
          float: right;
        }
      `}</style>
    </>
  );
}

export default App;
