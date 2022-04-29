const Alert = ({ type, message }) => {
  const utility = {
    primary: "lightblue",
    secondary: "grey",
    danger: "red",
    warning: "yellow",
    success: "green",
  };

  const styles = {
    backgroundColor: utility[type],
    margin: "1rem",
    padding: "1rem",
    borderRadius: "15px",
    fontFamily: "monospace",
  };
  return <div style={styles}>{message}</div>;
};
