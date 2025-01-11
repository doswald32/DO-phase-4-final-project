// import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function NewOwner({ onClose }) {

    const { setOwners } = useOutletContext();

    const formSchema = Yup.object({
        firstName: Yup.string().required("First name is required."),
        lastName: Yup.string().required("Last name is required.")
    });

    const formik = useFormik ({
        initialValues: {
            firstName: "",
            lastName: ""
        }, 
        validationSchema: formSchema,
        onSubmit: (values, { resetForm }) => {
            fetch("http://127.0.0.1:5555/owners", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json",
                }, 
                body: JSON.stringify(values, null, 2),
            })
            .then((r) => r.json())
            .then((data) => {setOwners((prevOwners) => [...prevOwners, data])
                resetForm()
            })
        }
    })

    return (
        <main>
            <div className="new-owner-form-container">
                <form className="new-owner-form" onSubmit={formik.handleSubmit}>
                    <label htmlFor="firstName">First Name: </label>
                    <input id="firstName" name="firstName" placeholder="First Name" value={formik.values.firstName} onChange={formik.handleChange}/>
                    <label htmlFor="lastName">Last Name: </label>
                    <input id="lastName" name="lastName" placeholder="Last Name" value={formik.values.lastName} onChange={formik.handleChange}/>
                    <button type="submit">Submit</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </main>
    )
}

export default NewOwner;