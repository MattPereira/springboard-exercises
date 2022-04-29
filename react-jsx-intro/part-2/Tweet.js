const Tweet = ({ username, profilePic, name, date, message }) => {
  return (
    <div className="card bg-black text-white border-1 border-white mb-3">
      <div className="card-body">
        <div className="row">
          <div className="col-1 align-self-center">
            <img className="img-fluid" src={profilePic}></img>
          </div>
          <div className="col-11">
            <h5>
              {name}
              <span className="text-muted mx-3">
                @{username} · {date}{" "}
              </span>
            </h5>
            <p className="card-text font-monospace">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
