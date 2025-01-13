// import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function NewVetForm({ onClose }) {
    
    const { setVets } = useOutletContext();
    
    const formSchema = Yup.object({
        first_name: Yup.string().required("First name is required."),
        last_name: Yup.string().required("Last name is required."),
        hire_date: Yup.date().required("Hire date is required."),
    })

    const formik = useFormik ({
        initialValues: {
            first_name: "",
            last_name: "",
            hire_date: "",
        },
        validationSchema: formSchema,
        onSubmit: (values, { resetForm }) => {
            fetch('http://127.0.0.1:5555/vets', {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            })
            .then((r) => r.json())
            .then((data) => setVets((prevVets) => ([...prevVets, data])))
            resetForm();
        }
    })

    return (
        <main>
            <div className="new-vet-form-container">
                <form className="new-vet-form" onSubmit={formik.handleSubmit}>
                    <label htmlFor="first_name">First Name: </label>
                    <input id="first_name" name="first_name" placeholder="First Name" value={formik.values.first_name} onChange={formik.handleChange}/>
                    <br/>
                    <label htmlFor="last_name">Last Name: </label>
                    <input id="last_name" name="last_name" placeholder="Last Name" value={formik.values.last_name} onChange={formik.handleChange}/>
                    <br/>
                    <label htmlFor="hire_date">Hire Date: </label>
                    <input id="hire_date" name="hire_date" type="date" value={formik.values.hire_date} onChange={formik.handleChange}/>
                    <br/>
                    <button type="submit">Submit</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </main>
    )
}

export default NewVetForm;