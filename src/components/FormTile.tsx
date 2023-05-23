import { useMutation } from "@apollo/client";
import { Button } from "@material-ui/core";
import { DELETE_FORM } from "../app_constants/Mutations";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FormTile = (props: { data: { id: Number; title: any; description: any } }) => {
  const { id, title, description } = props.data;
  const navigator = useNavigate()

  const [deleteForm, { loading, error }] = useMutation(DELETE_FORM);

  const removeForm = async () => {
    deleteForm({ variables: { id :parseFloat(""+id)} })
    .then(() => {
      console.log(`Form with ID ${id} deleted successfully`);
    })
    .catch((error) => {
      console.error('Failed to delete form:', error);
    });
    window.location.reload();
  };
  
  const editForm = ()=>{
    navigator("/edit", {state:{formId:id}});
  }

  return (
    <div
      className="card m-3 shadow-sm"
      style={{ width: "200px", padding: "12px", marginLeft: "30px" }}
    >
      <h4>{title}</h4>
      <p>{description}</p>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="text"
            color="primary"
            style={{ marginRight: "8px" }}
            onClick={editForm}
          >
            Edit
          </Button>
          <Button
            variant="text"
            color="secondary"
            onClick={removeForm}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormTile;
