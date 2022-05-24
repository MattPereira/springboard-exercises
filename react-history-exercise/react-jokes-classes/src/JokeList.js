import React from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

class JokeList extends React.Component {
  static defaultProps = { numJokesToGet: 10 };
  constructor(props) {
    super(props);
    this.state = { jokes: [] };

    this.generateNewJokes = this.generateNewJokes.bind(this);
    this.resetVotes = this.resetVotes.bind(this);
    this.toggleLock = this.toggleLock.bind(this);
    this.vote = this.vote.bind(this);
  }

  /* Call this.getJokes() from API when component mounts */
  componentDidMount() {
    if (this.state.jokes.length < this.props.numJokesToGet) this.getJokes();
  }

  componentDidUpdate() {
    if (this.state.jokes.length < this.props.numJokesToGet) this.getJokes();
  }

  /* retrieve jokes from API */

  async getJokes() {
    try {
      let jokes = this.state.jokes;

      let seenJokes = new Set(jokes.map((j) => j.id));

      while (jokes.length < this.props.numJokesToGet) {
        let res = await axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" },
        });
        let { status, ...joke } = res.data;

        if (!seenJokes.has(joke.id)) {
          seenJokes.add(joke.id);

          jokes.push({ ...joke, votes: 0, locked: false });
        } else {
          console.log("duplicate joke");
        }
      }
      this.setState({ jokes: jokes });
    } catch (e) {
      console.log(e);
    }
  }

  //empty joke list which triggers call to get more jokes from api
  generateNewJokes() {
    this.setState((state) => ({ jokes: state.jokes.filter((j) => j.locked) }));
  }

  //change vote count by delta for each joke using id to update state
  vote(id, delta) {
    this.setState((state) => ({
      jokes: state.jokes.map((j) =>
        j.id === id ? { ...j, votes: j.votes + delta } : j
      ),
    }));
  }

  //reset vote counts in localstorage and state
  resetVotes() {
    this.setState((state) => ({
      jokes: state.jokes.map((joke) => ({ ...joke, votes: 0 })),
    }));
  }

  //tockle if joke locked
  toggleLock(id) {
    this.setState((state) => ({
      jokes: state.jokes.map((j) =>
        j.id === id ? { ...j, locked: !j.locked } : j
      ),
    }));
  }

  render() {
    let sortedJokes = [...this.state.jokes].sort((a, b) => b.votes - a.votes);

    return (
      <div className="JokeList">
        <button className="JokeList-getmore" onClick={this.generateNewJokes}>
          Get New Jokes
        </button>
        <button className="JokeList-getmore" onClick={this.resetVotes}>
          Reset Vote Counts
        </button>

        {sortedJokes.map((j) => (
          <Joke
            text={j.joke}
            key={j.id}
            id={j.id}
            votes={j.votes}
            vote={this.vote}
            locked={j.locked}
            toggleLock={this.toggleLock}
          />
        ))}

        {sortedJokes.length < this.props.numJokesToGet ? (
          <div className="loading">
            <i className="fas fa-10x fa-spinner fa-spin" />
          </div>
        ) : null}
      </div>
    );
  }
}

export default JokeList;

// REACT WITH HOOKS AND FUNCTION COMPONENTS
// function JokeList({ numJokesToGet = 10 }) {
//   const [jokes, setJokes] = useState([]);

//   /* get jokes if there are no jokes */

//   useEffect(
//     function () {
//       async function getJokes() {
//         let j = [...jokes];
//         let seenJokes = new Set();
//         try {
//           while (j.length < numJokesToGet) {
//             let res = await axios.get("https://icanhazdadjoke.com", {
//               headers: { Accept: "application/json" },
//             });
//             let { status, ...jokeObj } = res.data;

//             if (!seenJokes.has(jokeObj.id)) {
//               seenJokes.add(jokeObj.id);
//               j.push({ ...jokeObj, votes: 0 });
//             } else {
//               console.error("duplicate found!");
//             }
//           }
//           setJokes(j);
//         } catch (e) {
//           console.log(e);
//         }
//       }

//       if (jokes.length === 0) getJokes();
//     },
//     [jokes, numJokesToGet]
//   );

//   /* empty joke list and then call getJokes */

//   function generateNewJokes() {
//     setJokes([]);
//   }

//   /* change vote for this id by delta (+1 or -1) */

//   function vote(id, delta) {
//     setJokes((allJokes) =>
//       allJokes.map((j) => (j.id === id ? { ...j, votes: j.votes + delta } : j))
//     );
//   }

//   /* render: either loading spinner or list of sorted jokes. */

//   if (jokes.length) {
//     let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);

//     return (
//       <div className="JokeList">
//         <button className="JokeList-getmore" onClick={generateNewJokes}>
//           Get New Jokes
//         </button>

//         {sortedJokes.map((j) => (
//           <Joke
//             text={j.joke}
//             key={j.id}
//             id={j.id}
//             votes={j.votes}
//             vote={vote}
//           />
//         ))}
//       </div>
//     );
//   }

//   return null;
// }
