const Button = ({ type, text }) => {
  const utility = {
    primary: "lightblue",
    secondary: "grey",
    danger: "red",
    success: "#4CAF50",
    warning: "orange",
  };

  const styles = {
    backgroundColor: utility[type],
    borderRadius: "10px",
    color: "white",
    padding: "0.75rem",
    border: "none",
    margin: "0.5rem",
  };

  return <button style={styles}>{text}</button>;
};
