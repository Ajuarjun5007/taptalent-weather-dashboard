function FullPageLoader({ visible }) {
  return (
    <div className={`fade-overlay ${visible ? 'show' : 'hide'}`}>
      <h1 className="fade-logo">TapTalent Weather</h1>
    </div>
  );
}

export default FullPageLoader;
