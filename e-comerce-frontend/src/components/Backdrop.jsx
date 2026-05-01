const Backdrop = ({ click, show }) => {
  return (
    show && (
      <div
        className="position-fixed top-0 start-0 w-100 h-100"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1030,
          cursor: "pointer",
        }}
        onClick={click}
      ></div>
    )
  );
};

export default Backdrop;
