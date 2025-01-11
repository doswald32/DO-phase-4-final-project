// import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function NewVetForm({ onClose }) {
    const { setVets } = useOutletContext();
    // const [firstName, setFirstName] = useState("");
    // const [lastName, setLastName] = useState("");
    // const [hireDate, setHireDate] = useState("");

    const formSchema = Yup.object({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required."),
        hireDate: Yup.date().required("Hire date is required"),
    })

    const formik = useFormik ({
        initialValues: {
            firstName: "",
            lastName: "",
            hireDate: "",
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
                    <label htmlFor="firstName">First Name: </label>
                    <input id="firstName" name="firstName" placeholder="First Name" value={formik.values.firstName} onChange={formik.handleChange}/>
                    <label htmlFor="lastName">Last Name: </label>
                    <input id="lastName" name="lastName" placeholder="Last Name" value={formik.values.lastName} onChange={formik.handleChange}/>
                    <label htmlFor="hireDate">Hire Date: </label>
                    <input id="hireDate" name="hireDate" type="date" value={formik.values.hireDate} onChange={formik.handleChange}/>
                    <button type="submit">Submit</button>
                    <button onClick={onClose}>Cancel</button>
                </form>
            </div>
        </main>
    )
}

export default NewVetForm;