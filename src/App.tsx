import { Route, Routes } from "react-router-dom";
import "./App.css";
import FormComponent from "./screens/CreateForm";
import CreateForm from "./screens/CreateForm";
import EditForm from "./screens/EditForm";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/create" element={<CreateForm />} />
        <Route path="/" element={<EditForm />} />
      </Routes>
    </div>
  );
}

export default App;
