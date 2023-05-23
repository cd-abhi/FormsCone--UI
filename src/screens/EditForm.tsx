import { Field, FieldArray, FieldArrayRenderProps, Form, Formik } from "formik";
import {
  AiOutlineDelete,
  AiOutlineCopy,
  AiOutlinePlus,
  AiOutlineCalendar,
} from "react-icons/ai";
import { ItemType } from "../utils/enums";
import {
  CREATE_FORM,
  ADD_ITEMS,
} from "../app_constants/Mutations";
import { useMutation } from "@apollo/client";

const getType = (form: {
  question?: string;
  description?: string;
  QuestionType: any;
}) => {
  if (form.QuestionType == ItemType.Text) return "Question";
  return "Date";
};

function renderItem(
  index: any,
  field1Name: string,
  field1Placeholder: string,
  field2Name: string,
  field2Placeholder: string,
  field2Type: string
) {
  return (
    <div key={`item${index}`} className="form-row align-items-center">
      <div className="col">
        <Field
          type="text"
          className="form-control"
          name={`Formdata[${index}].${field1Name}`}
          placeholder={field1Placeholder}
        />
      </div>
      <div className="col">
        <Field
          type={field2Type}
          className="form-control"
          name={`Formdata[${index}].${field2Name}`}
          placeholder={field2Placeholder}
        />
      </div>
    </div>
  );
}

function renderFormItem(
  form: { question?: string; description?: string; QuestionType: any },
  index: number,
  array: any
) {
  // switch (form.QuestionType) {
  //   case ItemType.Text:
  //     return renderItem(
  //       index,
  //       "question",
  //       "Question",
  //       "description",
  //       "Description",
  //       "text"
  //     );
  //   default:
  //     return renderItem(index, "question", "Question", "date", "Date", "date");
  // }
  return renderItem(
    index,
    "question",
    "Question",
    "description",
    "Description",
    "text"
  );
}

const submitData = async (values: {
  formTitle: string;
  formDescription: string;
  Formdata: { question: string; description: string; QuestionType: ItemType }[];
}) => {};

const renderButtons = (
  form: {
    question: string;
    description: string;
    QuestionType: ItemType;
  },
  index: number,
  array: FieldArrayRenderProps,
  values: { formTitle?: string; formDescription?: string; Formdata: any }
) => {
  return (
    <div key={index} className="form-group">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">
          {getType(form)} : {index + 1}
        </h5>

        <div>
          <button
            type="button"
            className="btn btn-sm mr-2"
            onClick={() => array.insert(index + 1, values.Formdata[index])}
          >
            <AiOutlineCopy style={{ color: "black" }} />
          </button>
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => array.remove(index)}
          >
            <AiOutlineDelete style={{ color: "black" }} />
          </button>
        </div>
      </div>
      <div>{renderFormItem(form, index, array)}</div>
    </div>
  );
};

const EditForm = () => {
  const [createForm] = useMutation(CREATE_FORM);
  const [addItems] = useMutation(ADD_ITEMS)

  return (
    <div className="container">
      <Formik
        initialValues={{
          formTitle: "",
          formDescription: "",
          Formdata: [],
        }}
        onSubmit={async (values) => {
          console.log(values);
          try {
            const title = values.formTitle;
            const description = values.formDescription;
            const result = await createForm({
              variables: { title, description },
            });
            sessionStorage['token'] = result.data.createForm.result
          } catch (error) {
            console.error("Failed to create form:", error);
           }

          //add all Items
          try{
            const { data } = await addItems({
              variables: {
                input: values.Formdata
              },
            });
          }catch(error){
            console.error("Failed to add items : ", error);
          }
        }}
      >
        {({ values }) => (
          <Form>
            <div className="form-row align-items-center">
              <button type="submit" className="btn btn-primary mt-3 ">
                Submit
              </button>
              <div className="col">
                <Field
                  type="text"
                  className="form-control"
                  name={`formTitle`}
                  placeholder="Title"
                />
              </div>
              <div className="col">
                <Field
                  type="text"
                  className="form-control"
                  name={`formDescription`}
                  placeholder={`Description`}
                />
              </div>
            </div>

            <FieldArray
              name="Formdata"
              render={(array) => (
                <div>
                  {values.Formdata.map((form, index) =>
                    renderButtons(form, index, array, values)
                  )}
                  <div className="text-center">
                    <button
                      type="button"
                      className="btn btn-sm mr-2"
                      onClick={() =>
                        array.insert(values.Formdata.length,{
                          question: "",
                          description: "",
                          // QuestionType: ItemType.Date,
                        })
                      }
                    >
                      <AiOutlineCalendar style={{ color: "black" }} />
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm mr-2"
                      onClick={() =>
                        array.insert(values.Formdata.length, {
                          question: "",
                          description: "",
                          // QuestionType: ItemType.Text,
                        })
                      }
                    >
                      <AiOutlinePlus style={{ color: "black" }} />
                    </button>
                  </div>
                </div>
              )}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditForm;
