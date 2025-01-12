import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import NewOwner from "./NewOwner";
import NewVetForm from "./NewVetForm";

function NewAnimal() {
    
    const { setAnimalsList, owners, vets } = useOutletContext();
    const [isNewOwnerOpen, setIsNewOwnerOpen] = useState(false);
    const [isNewVetOpen, setIsNewVetOpen] = useState(false);


    const formSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        species: Yup.string().required("Species is required"),
        dob: Yup.date().required("Date of birth is required"),
        ownerId: Yup.string().required("Owner is required"),
        vet_id: Yup.string().required("Veterinarian is required"),
        visit_date: Yup.date().required("Visit date is required"),
        visit_summary: Yup.string().required("Visit summary is required"),
    });

    const formik = useFormik ({
        initialValues: {
            name: "",
            species: "",
            dob: "",
            ownerId: "",
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
                owners: [values.ownerId],
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


    function ownerOptions() {
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
                    <label htmlFor="ownerId">Owner: </label>
                        <select id="ownerId" name="ownerId" className="animal-form-inputs" value={formik.values.ownerIdwnerId} onChange={formik.handleChange}>
                            <option value="">Select an Owner</option>
                            {ownerOptions()}
                        </select>
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
                <p>Don't see the correct Owner or Attending Veterinarian? Add either one to the database below!</p>
                <button id="new-owner-button" className="add-new-owner-row" onClick={() => setIsNewOwnerOpen(true)}>Add New Owner</button>
                {isNewOwnerOpen && (
                    <NewOwner onClose={() => setIsNewOwnerOpen(false)}></NewOwner>
                )}
                <button onClick={() => setIsNewVetOpen(true)}>Add Veterinarian</button>
                {isNewVetOpen && (
                    <NewVetForm onClose={() => setIsNewVetOpen(false)}></NewVetForm>
            )}
        </main>
    )
}

export default NewAnimal;