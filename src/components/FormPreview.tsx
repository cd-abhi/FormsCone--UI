const Preview = (props: {
  data: { id: Number; question: any; description: any };
}) => {
  const { id, question, description } = props.data;

  console.log("preview");

  return (
    <div className="container1">
      <div className="container">
        <h1 style={{ color: "black" }}>{question}</h1>
        <input type="text" />{" "}
      </div>{" "}
    </div>
  );
};

export default Preview;
