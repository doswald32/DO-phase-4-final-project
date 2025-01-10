import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function NewAnimal() {
    const { setAnimalsList } = useOutletContext();
    const [owners, setOwners] = useState([])
    const [vets, setVets] = useState([])
    

    useEffect(() => {
        fetch('http://127.0.0.1:5555/owners')
        .then(r => r.json())
        .then(data => setOwners(data))
    }, []);


    useEffect(() => {
        fetch('http://127.0.0.1:5555/vets')
        .then(r => r.json())
        .then(data => setVets(data))
    }, []);


    const formSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        species: Yup.string().required("Species is required"),
        dob: Yup.date().required("Date of birth is required"),
        primaryOwnerId: Yup.string().required("Primary owner is required"),
        vet_id: Yup.string().required("Veterinarian is required"),
        visit_date: Yup.date().required("Visit date is required"),
        visit_summary: Yup.string().required("Visit summary is required"),
    });


    const formik = useFormik ({
        initialValues: {
            name: "",
            species: "",
            dob: "",
            primaryOwnerId: "",
            vet_id: "",
            visit_date: "",
            visit_summary: "",
        },
        validationSchema: formSchema,
        onSubmit: (values, { resetForm }) => {
            const formattedValues = {
                name: values.name,
                species: values.species,
                dob: values.dob,
                vet_id: values.vet_id,
                owners: [values.primaryOwnerId],
                visits: [
                    {
                        date: values.visit_date,
                        summary: values.visit_summary,
                    },
                ],
            };
            fetch("http://127.0.0.1:5555/animals", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formattedValues, null, 2),
            })
            .then((r) => r.json())
            .then((data) => {setAnimalsList((prevAnimalsList) => [...prevAnimalsList, data]);
                resetForm();
            });
        },
    })


    function primaryOwnerOptions() {
        return owners.map((owner) => (
            <option key={owner.id} value={owner.id}>{`${owner.first_name} ${owner.last_name}`}</option>
        ))
    }

    function vetOptions() {
        return vets.map((vet) => (
            <option key={vet.id} value={vet.id}>{`${vet.first_name} ${vet.last_name}`}</option>
        ))
    }

    return (
        <main>
                <form className="new-animal-form" onSubmit={formik.handleSubmit}>
                    <label htmlFor="name">Name: </label>
                    <input id="name" name="name" className="animal-form-inputs" placeholder="Name" value={formik.values.name} onChange={formik.handleChange}/>
                    <label htmlFor="species">Species: </label>
                    <input id="species" name="species" className="animal-form-inputs" placeholder="Species" value={formik.values.species} onChange={formik.handleChange}/>
                    <label htmlFor="dob">DOB: </label>
                    <input id="dob" name="dob" className="animal-form-inputs" type="date" value={formik.values.dob} onChange={formik.handleChange}/>
                    <label htmlFor="primaryOwnerId">Owner: </label>
                    <div className="primary-owner-container">
                        <select id="primaryOwnerId" name="primaryOwnerId" className="animal-form-inputs" value={formik.values.primaryOwnerId} onChange={formik.handleChange}>
                            <option value="">Select an Owner</option>
                            {primaryOwnerOptions()}
                        </select>
                        <button id="new-owner-button" className="add-new-owner-row">Add New Owner</button>
                    </div>
                    <label htmlFor="vet_id">Attending Veterinarian: </label>
                        <select id="vet_id" name="vet_id" className="animal-form-inputs" value={formik.values.vet_id} onChange={formik.handleChange}>
                            <option>Select a Veterinarian</option>
                            {vetOptions()}
                        </select>
                    <label htmlFor="visit_date">Visit Date: </label>
                    <input id="visit_date" name="visit_date" className="animal-form-inputs" type="date" value={formik.values.visit_date} onChange={formik.handleChange}/>
                    <label htmlFor="visit_summary">Visit Summary: </label>
                    <input id="visit_summary" name="visit_summary" className="animal-form-inputs" type="textarea" value={formik.values.visit_summary} onChange={formik.handleChange}/>
                    <button id="new-animal-submit-button" type="submit">Submit</button>
                </form>
        </main>
    )
}

export default NewAnimal;