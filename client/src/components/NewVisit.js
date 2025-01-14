import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import NewVetForm from "./NewVetForm";
import NewPet from "./NewPetForm";

function NewVisit() {
    
    const { pets, vets, setVisits } = useOutletContext();
    const [isNewPetOpen, setIsNewPetOpen] = useState(false);
    const [isNewVetOpen, setIsNewVetOpen] = useState(false);


    const formSchema = Yup.object({
        pet: Yup.string().required("Pet is required"),
        vet: Yup.string().required("Veterinarian is required"),
        visit_date: Yup.date().required("Visit date is required"),
        visit_summary: Yup.string().required("Visit summary is required"),
    });

    const formik = useFormik ({
        initialValues: {
            pet: "",
            vet: "",
            visit_date: "",
            visit_summary: "",
        },
        validationSchema: formSchema,
        onSubmit: (values, { resetForm }) => {
            fetch("http://127.0.0.1:5555/visits", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    pet: values.pet,
                    vet: values.vet,
                    visit_date: values.visit_date,
                    visit_summary: values.visit_summary,
                }),
            })
            .then((r) => r.json())
            .then((data) => {setVisits((prevVisits) => [...prevVisits, data]);
                resetForm();
            });
        },
    })


    function petOptions() {
        return pets.map((pet) => (
            <option key={pet.id} value={pet.id}>{`Pet ${pet.id}: ${pet.name}`}</option>
        ))
    }

    function vetOptions() {
        return vets.map((vet) => (
            <option key={vet.id} value={vet.id}>{`Vet ${vet.id}: ${vet.first_name} ${vet.last_name}`}</option>
        ))
    }


    return (
        <main>
                <form className="new-visit-form" onSubmit={formik.handleSubmit}>
                    <label htmlFor="pet">Pet: </label>
                        <select id="pet" name="pet" className="visit-form-inputs" value={formik.values.pet} onChange={formik.handleChange}>
                            <option value="">Select a Pet</option>
                            {petOptions()}
                        </select>
                    <label htmlFor="vet">Attending Veterinarian: </label>
                        <select id="vet" name="vet" className="visit-form-inputs" value={formik.values.vet} onChange={formik.handleChange}>
                            <option>Select a Veterinarian</option>
                            {vetOptions()}
                        </select>
                    <label htmlFor="visit_date">Visit Date: </label>
                    <input id="visit_date" name="visit_date" className="visit-form-inputs" type="date" value={formik.values.visit_date} onChange={formik.handleChange}/>
                    <label htmlFor="visit_summary">Visit Summary: </label>
                    <input id="visit_summary" name="visit_summary" className="visit-form-inputs" type="textarea" value={formik.values.visit_summary} onChange={formik.handleChange}/>
                    <button id="new-visit-submit-button" type="submit">Submit</button>
                </form>
                <hr className="line"/>
                <br></br>
                <p>Don't see the correct Pet or Attending Veterinarian? Add either one to the database below!</p>
                <button className="new-pet-button" onClick={() => setIsNewPetOpen(true)}>Add New Pet</button>
                {isNewPetOpen && (
                    <NewPet onClose={() => setIsNewPetOpen(false)}></NewPet>
                )}
                <button className="new-vet-button" onClick={() => setIsNewVetOpen(true)}>Add Veterinarian</button>
                {isNewVetOpen && (
                    <NewVetForm onClose={() => setIsNewVetOpen(false)}></NewVetForm>
            )}
        </main>
    )
}

export default NewVisit;