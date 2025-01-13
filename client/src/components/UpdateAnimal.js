import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import * as Yup from "yup";

function UpdateAnimal() {
    const { id } = useParams();
    const { setAnimalsList, owners, vets } = useOutletContext();
    const [initialFormValues, setInitialFormValues] = useState(null)

    useEffect(() => {
        if (id) {
            fetch(`http://127.0.0.1:5555/animals/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    const primaryOwner = data.owners[0];
                    const secondaryOwner = data.owners[1] || null;
                    const formattedData = {
                        name: data.name || "",
                        species: data.species || "",
                        dob: data.dob ? new Date(data.dob).toISOString().split("T")[0] : "",
                        vet_id: data.vet?.id || "",
                        primaryOwnerId: primaryOwner?.id || "",
                        secondaryOwnerId: secondaryOwner?.id || "",
                        visit_date: data.visits[0]?.date || "",
                        visit_summary: data.visits[0]?.summary || "",
                    };
                    setInitialFormValues(formattedData);
                })
                .catch((error) => console.error("Error fetching animal:", error));
        }
    }, [id]);
                  

    function primaryOwnerOptions() {
        return owners.map((owner) => (
            <option key={owner.id} value={owner.id}>{`${owner.first_name} ${owner.last_name}`}</option>
        ))
    }

    function secondaryOwnerOptions(primaryOwnerId) {
        return owners
            .filter((owner) => owner.id !== parseInt(primaryOwnerId))
            .map((owner) => (
                <option key={owner.id} value={owner.id}>
                    {`${owner.first_name} ${owner.last_name}`}
                </option>
            ));
    }

    function vetOptions() {
        return vets.map((vet) => (
            <option key={vet.id} value={vet.id}>{`${vet.first_name} ${vet.last_name}`}</option>
        ))
    }

    const formSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        species: Yup.string().required("Species is required"),
        dob: Yup.date().required("Date of birth is required"),
        primaryOwnerId: Yup.string().required("Primary owner is required"),
        secondaryOwnerId: Yup.string(),
        vet_id: Yup.string().required("Veterinarian is required"),
        visit_date: Yup.date().required("Visit date is required"),
        visit_summary: Yup.string().required("Visit summary is required"),
    })

    const formik = useFormik({
        initialValues: initialFormValues || {
            name: "",
            species: "",
            dob: "",
            vet_id: "",
            primaryOwnerId: "",
            secondaryOwnerId: "",
            visit_date: "",
            visit_summary: "",
        },
        enableReinitialize: true,
        validationSchema: formSchema,
        onSubmit: (values, { resetForm }) => {
            console.log("Submitting form...")
            console.log("Form values: ", values)
            const payload = {
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

            // Add secondary owner if selected
            if (values.secondaryOwnerId) {
                payload.owners.push(values.secondaryOwnerId);
            }

            fetch(`http://127.0.0.1:5555/animals/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            })
                .then((response) => response.json())
                .then((updatedAnimal) => {
                    setAnimalsList((prevList) =>
                        prevList.map((animal) =>
                            animal.id === updatedAnimal.id ? updatedAnimal : animal
                        )
                    );
                    resetForm();
                })
                .catch((error) => console.error("Error updating animal:", error));
        },
    });


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
                    <select id="primaryOwnerId" name="primaryOwnerId" className="animal-form-inputs" value={formik.values.primaryOwnerId} onChange={formik.handleChange}>
                        <option value="">Select an Owner</option>
                        {primaryOwnerOptions()}
                    </select>
                <label htmlFor="secondaryOwnerId">Secondary Owner: </label>
                    <select id="secondaryOwnerId" name="secondaryOwnerId" className="animal-form-inputs" value={formik.values.secondaryOwnerId} onChange={formik.handleChange}>
                        <option value="">Select a Secondary Owner</option>
                        {secondaryOwnerOptions(formik.values.primaryOwnerId)}
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
        </main>
    )
}

export default UpdateAnimal;