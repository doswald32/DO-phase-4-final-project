// import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function NewPetForm({ onClose }) {

    const { setPets } = useOutletContext();

    const formSchema = Yup.object({
        name: Yup.string().required("Name is required."),
        dob: Yup.string().required("Date of birth is required."),
        species: Yup.string().required("Species is required."),
    });

    const formik = useFormik ({
        initialValues: {
            name: "",
            dob: "",
            species: "",
        }, 
        validationSchema: formSchema,
        onSubmit: (values, { resetForm }) => {
            fetch("http://127.0.0.1:5555/pets", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json",
                }, 
                body: JSON.stringify(values, null, 2),
            })
            .then((r) => r.json())
            .then((data) => {setPets((prevPets) => [...prevPets, data])
                resetForm()
            })
        }
    })

    return (
        <main>
            <div className="new-pet-form-container">
                <form className="new-pet-form" onSubmit={formik.handleSubmit}>
                    <label htmlFor="name">Name: </label>
                    <input id="name" name="name" placeholder="Name" value={formik.values.name} onChange={formik.handleChange}/>
                    <br/>
                    <label htmlFor="dob">DOB: </label>
                    <input id="dob" name="dob" type="date" value={formik.values.dob} onChange={formik.handleChange}/>
                    <label htmlFor="species">Species: </label>
                    <input id="species" name="species" placeholder="Species" value={formik.values.species} onChange={formik.handleChange}/>
                    <button type="submit">Submit</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </main>
    )
}

export default NewPetForm;