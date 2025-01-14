import { useFormik } from "formik";
import { useOutletContext, useParams } from "react-router-dom";
import * as Yup from "yup";

function UpdateVisit() {
    const { id } = useParams();
    const { setVisits, pets, vets } = useOutletContext();
                  

    function petOptions() {
        return pets.map((pet) => (
            <option key={pet.id} value={pet.id}>{`Pet ${pet.id}: ${pet.name}`}</option>
        ))
    }

    function vetOptions() {
        return vets.map((vet) => (
            <option key={vet.id} value={vet.id}>{`${vet.first_name} ${vet.last_name}`}</option>
        ))
    }

    const formSchema = Yup.object({
        visit_date: Yup.date().required("Visit date is required."),
        visit_summary: Yup.string().required("Visit summary is required."),
        pet_id: Yup.string().required("Pet is required."),
        vet_id: Yup.string().required("Veterinarian is required."),
    })

    const formik = useFormik({
        initialValues: {
            visit_date: "",
            visit_summary: "",
            pet_id: "",
            vet_id: "",
        },
        validationSchema: formSchema,
        onSubmit: (values, { resetForm }) => {
            fetch(`http://127.0.0.1:5555/visits/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })
            .then((response) => response.json())
            .then((data) => {
                setVisits((prevVisits) => {
                    const updatedVisits = prevVisits.map((visit) => 
                    visit.id === data.id ? data : visit
                );
                return updatedVisits
                });
                resetForm();
            })
            .catch((error) => console.error("Error updating visit:", error));
        },
    });

    return (
        <main>
            <form className="new-visit-form" onSubmit={formik.handleSubmit}>
                    <label htmlFor="pet_id">Pet: </label>
                        <select id="pet_id" name="pet_id" className="visit-form-inputs" value={formik.values.pet_id} onChange={formik.handleChange}>
                        <option value="">Select a Pet</option>
                        {petOptions()}
                        </select>
                    <label htmlFor="vet_id">Attending Veterinarian: </label>
                        <select id="vet_id" name="vet_id" className="visit-form-inputs" value={formik.values.vet_id} onChange={formik.handleChange}>
                        <option value="">Select a Veterinarian</option>
                        {vetOptions()}
                        </select>
                    <label htmlFor="visit_date">Visit Date: </label>
                    <input id="visit_date" name="visit_date" className="visit-form-inputs" type="date" value={formik.values.visit_date} onChange={formik.handleChange}/>
                    <label htmlFor="visit_summary">Visit Summary: </label>
                    <input id="visit_summary" name="visit_summary" className="visit-form-inputs" type="textarea" value={formik.values.visit_summary} onChange={formik.handleChange}/>
                    <button id="new-visit-submit-button" type="submit">Submit</button>
                </form>
        </main>
    )
}

export default UpdateVisit;