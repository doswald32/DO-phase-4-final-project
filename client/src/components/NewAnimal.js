import React, { useState } from "react";

function NewAnimal() {

    const [newAnimalData, setNewAnimalData] = useState({
        name: "",
        dob: "",
        species: "",
        owner_name: "",
        last_visit: "",
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

    function onChangeOwnerName(e) {
        setNewAnimalData({ ...newAnimalData, owner_name: e.target.value })
    }

    function onChangeLastVisit(e) {
        setNewAnimalData({ ...newAnimalData, last_visit: e.target.value })
    }

    console.log(newAnimalData)

    return (
        <>
            <main>
                <form className="new-animal-form">
                    <label>Name: </label>
                    <input id="animal-form-name" className="animal-form-inputs" type="text" placeholder="Name" value={newAnimalData.name} onChange={onChangeName}/>
                    <label>DOB: </label>
                    <input id="animal-form-dob" className="animal-form-inputs" type="date" value={newAnimalData.dob} onChange={onChangeDOB}/>
                    <label>Species: </label>
                    <input id="animal-form-species" className="animal-form-inputs" type="text" placeholder="Species" value={newAnimalData.species} onChange={onChangeSpecies}/>
                    <label>Owner Name: </label>
                    <input id="animal-form-owner" className="animal-form-inputs" type="text" placeholder="Owner Name" value={newAnimalData.owner_name} onChange={onChangeOwnerName}/>
                    <label>Visit Date: </label>
                    <input id="animal-form-visit" className="animal-form-inputs" type="date" value={newAnimalData.last_visit} onChange={onChangeLastVisit}/>
                    <button id="new-animal-submit-button">Submit</button>
                </form>
            </main>
        </>
    )
}

export default NewAnimal;