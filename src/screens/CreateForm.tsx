import { useMutation, useQuery } from "@apollo/client";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { CREATE_FORM, GET_FORMS, GET_ITEMS } from "../app_constants/Mutations";
import FormTile from "../components/FormTile";
import FormPreview from "../components/FormPreview";

const CreateForm = () => {
  // Queries
  const [createForm] = useMutation(CREATE_FORM);
//   const { loading, error, data,refetch } = useQuery(GET_FORMS, {
//  });

 const {loading,error,data,refetch} = useQuery(GET_ITEMS);

  const initialValues = {
    title: "",
    description: "",
  };

  useEffect(() => {
    refetch();
  });

  const [showDialog, setShowDialog] = useState(false);

  const onSubmit = async (
    values: { title: string; description: string },
    { resetForm }: any
  ) => {
    console.log(values.title + " " + values.description);
    try {
      const { data } = await createForm({
        variables: {
          title: values.title,
          description: values.description,
        },
      });
      console.log("Form created:", data.createForm);
      resetForm();
      refetch();
      setShowDialog(false);
    } catch (error) {
      console.error("Failed to create form:", error);
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2 style={{ marginTop: "32px", marginBottom: "16px" }}>
        Available Forms
      </h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {data.forms.map((form: any) => (
            // <FormTile key={form.id} data={form} />
            data?.Items.map((item:any,index:any)=>{

               { console.log(item.question)}
              
             return <FormPreview  data={item} />
              
              })
          ))} 
        </div>
      )}
    </div>
  );
};

export default CreateForm;
