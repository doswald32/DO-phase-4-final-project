import React, { useState } from "react";

function NewAnimal() {

    const [newAnimalData, setNewAnimalData] = useState({
        name: "",
        species: "",
        dob: "",
        primary_owner_name: "",
        secondary_owner_name: "",
        visit_date: "",
        visit_summary: ""
    });

    function onChangeName(e) {
        setNewAnimalData({ ...newAnimalData, name: e.target.value })
        console.log(newAnimalData)
    }

    function onChangeDOB(e) {
        setNewAnimalData({ ...newAnimalData, dob: e.target.value })
        console.log(newAnimalData)
    }

    function onChangeSpecies(e) {
        setNewAnimalData({ ...newAnimalData, species: e.target.value })
    }

    function onChangePrimaryOwnerName(e) {
        setNewAnimalData({ ...newAnimalData, primary_owner_name: e.target.value })
    }

    function onChangeSecondaryOwnerName(e) {
        setNewAnimalData({ ...newAnimalData, secondary_owner_name: e.target.value })
    }

    function onChangeVisitDate(e) {
        setNewAnimalData({ ...newAnimalData, visit_date: e.target.value })
    }

    function onChangeVisitSummary(e) {
        setNewAnimalData({ ...newAnimalData, visit_summary: e.target.value })
    }

    console.log(newAnimalData)

    return (
        <>
            <main>
                <form className="new-animal-form">
                    <label>Name: </label>
                    <input id="animal-form-name" className="animal-form-inputs" type="text" placeholder="Name" value={newAnimalData.name} onChange={onChangeName}/>
                    <label>Species: </label>
                    <input id="animal-form-species" className="animal-form-inputs" type="text" placeholder="Species" value={newAnimalData.species} onChange={onChangeSpecies}/>
                    <label>DOB: </label>
                    <input id="animal-form-dob" className="animal-form-inputs" type="date" value={newAnimalData.dob} onChange={onChangeDOB}/>
                    <label>Primary Owner: </label>
                    <input id="animal-form-owner" className="animal-form-inputs" type="text" placeholder="Owner Name" value={newAnimalData.owner_name} onChange={onChangePrimaryOwnerName}/><button id="new-owner-button">Add New Owner</button>
                    <label>Secondary Owner (Optional): </label>
                    <input id="animal-form-owner" className="animal-form-inputs" type="text" placeholder="Owner Name" value={newAnimalData.owner_name} onChange={onChangeSecondaryOwnerName}/>
                    <label>Visit Date: </label>
                    <input id="animal-form-visit-date" className="animal-form-inputs" type="date" value={newAnimalData.visit_date} onChange={onChangeVisitDate}/>
                    <label>Visit Summary: </label>
                    <input id="animal-form-visit-summary" className="animal-form-inputs" type="textarea" value={newAnimalData.visit_summary} onChange={onChangeVisitSummary}/>
                    <button id="new-animal-submit-button">Submit</button>
                </form>
            </main>
        </>
    )
}

export default NewAnimal;