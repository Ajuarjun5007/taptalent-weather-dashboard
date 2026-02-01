function Loader() {
  return (
    <div className="loader-overlay">
      <div className="glass-loader">
        <div className="ring"></div>
        <p className="loading-text">Fetching live weather…</p>
      </div>
    </div>
  );
}

export default Loader;
