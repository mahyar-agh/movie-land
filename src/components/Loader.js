function Loader() {
  return (
    <div className="lds-container">
      <span>Loading</span>
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loader;
