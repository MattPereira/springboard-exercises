const Person = ({ name, age, hobbies }) => {
  let voteStatus = age >= 18 ? "Please go vote!" : "You must be 18.";

  let hobbyList = hobbies.map((h, idx) => <li key={idx}>{h}</li>);

  return (
    <div className="mb-5 border border-1 border-dark p-5 rounded col-4">
      <p>Learn some information about this person</p>
      <ul>
        <li>
          <b>Name:</b> {name.length > 8 ? name.slice(0, 6) : name}
        </li>
        <li>
          <b>Age:</b> {age}
        </li>
      </ul>
      <h3>{voteStatus}</h3>
      <ul>
        <h5>
          <u>hobbies</u>
        </h5>
        {hobbyList}
      </ul>
    </div>
  );
};
