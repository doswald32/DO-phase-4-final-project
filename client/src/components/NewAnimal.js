import React, { useState, useEffect } from "react";

function NewAnimal() {

    const [newAnimalData, setNewAnimalData] = useState({
        name: "",
        species: "",
        dob: "",
        primary_owner: {
            id: "",
            first_name: "",
            last_name: ""
        },
        secondary_owner_: {
            id: "",
            first_name: "",
            last_name: ""
        },
        visit_date: "",
        visit_summary: ""
    });

    const [owners, setOwners] = useState([])
    const [primaryOwnerId, setPrimaryOwnerId] = useState("")
    const [secondaryOwnerId, setSecondaryOwnerId] = useState("")
    

    useEffect(() => {
        fetch('http://127.0.0.1:5555/owners')
        .then(r => r.json())
        .then(data => setOwners(data))
    }, [])

    function primaryOwnerName() {
        return owners.map((owner) => (
            <option key={owner.id} value={owner.id}>{`${owner.first_name} ${owner.last_name}`}</option>
        ))
    }

    function secondaryOwnerName() {
        const primaryId = parseInt(primaryOwnerId, 10)
        return owners.filter((owner) => owner.id !== primaryId).map((owner) => (
            <option key={owner.id} value={owner.id}>{`${owner.first_name} ${owner.last_name}`}</option>
        ))
    }

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

    function onChangePrimaryOwnerId(e) {
        setPrimaryOwnerId(e.target.value)
    }

    function onChangeSecondaryOwnerId(e) {
        setSecondaryOwnerId(e.target.value)
    }

    function onChangeVisitDate(e) {
        setNewAnimalData({ ...newAnimalData, visit_date: e.target.value })
    }

    function onChangeVisitSummary(e) {
        setNewAnimalData({ ...newAnimalData, visit_summary: e.target.value })
    }

    console.log(primaryOwnerId)

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
                    <div>
                        <select id="animal-form-owner-primary" className="animal-form-inputs" value={primaryOwnerId} onChange={onChangePrimaryOwnerId}>
                            <option value="">Select an Owner</option>
                            {primaryOwnerName()}
                        </select>
                        <button id="new-owner-button" className="add-new-owner-row">Add New Owner</button>
                    </div>
                    <label>Secondary Owner (Optional): </label>
                    <select id="animal-form-owner-secondary" className="animal-form-inputs" value={secondaryOwnerId} onChange={onChangeSecondaryOwnerId}>
                        <option value="">Select an Owner</option>
                        {secondaryOwnerName()}
                    </select>
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