import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

function NewAnimal() {
    const { animalsList, setAnimalsList } = useOutletContext();

    const [newAnimalData, setNewAnimalData] = useState({
        name: "",
        species: "",
        dob: "",
        vet: "",
        owners: [],
        visits: [],
        visit_date: "",
        visit_summary: "",
    });

    const [owners, setOwners] = useState([])
    const [vets, setVets] = useState([])
    const [primaryOwnerId, setPrimaryOwnerId] = useState("")
    const [secondaryOwnerId, setSecondaryOwnerId] = useState("")
    const [vetId, setVetId] = useState("")
    

    useEffect(() => {
        fetch('http://127.0.0.1:5555/owners')
        .then(r => r.json())
        .then(data => setOwners(data))
    }, [])

    useEffect(() => {
        fetch('http://127.0.0.1:5555/vets')
        .then(r => r.json())
        .then(data => setVets(data))
    }, [])

    function handleSubmit(e) {
        e.preventDefault();

        const newAnimal = {
            name: newAnimalData.name,
            species: newAnimalData.species,
            dob: newAnimalData.dob,
            vet_id: vetId,
            owners: [primaryOwnerId, secondaryOwnerId].filter(Boolean),
            visits: [
                {
                    date: newAnimalData.visit_date,
                    summary: newAnimalData.visit_summary,
                }
            ]
        }
        fetch('http://127.0.0.1:5555/animals', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newAnimal),
        })
            .then((r) => r.json())
            .then((data) => setAnimalsList((prevAnimalsList) => [ ...prevAnimalsList, data]))
        
        setNewAnimalData({
            name: "",
            species: "",
            dob: "",
            vet: "",
            owners: [],
            visits: [],
            visit_date: "",
            visit_summary: "",
        });
        setPrimaryOwnerId("");
        setSecondaryOwnerId("");
        setVetId("");
    };


    

    function primaryOwnerOptions() {
        return owners.map((owner) => (
            <option key={owner.id} value={owner.id}>{`${owner.first_name} ${owner.last_name}`}</option>
        ))
    }

    function secondaryOwnerOption() {
        const primaryId = parseInt(primaryOwnerId, 10)
        return owners.filter((owner) => owner.id !== primaryId).map((owner) => (
            <option key={owner.id} value={owner.id}>{`${owner.first_name} ${owner.last_name}`}</option>
        ))
    }

    function vetOptions() {
        return vets.map((vet) => (
            <option key={vet.id} value={vet.id}>{`${vet.first_name} ${vet.last_name}`}</option>
        ))
    }

    function onChangeName(e) {
        setNewAnimalData({ ...newAnimalData, name: e.target.value })
    }

    function onChangeDOB(e) {
        setNewAnimalData({ ...newAnimalData, dob: e.target.value })
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

    function onChangeVetId(e) {
        setVetId(e.target.value)
    }

    function onChangeVisitDate(e) {
        setNewAnimalData({ ...newAnimalData, visit_date: e.target.value })
    }

    function onChangeVisitSummary(e) {
        setNewAnimalData({ ...newAnimalData, visit_summary: e.target.value })
    }



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
                            {primaryOwnerOptions()}
                        </select>
                        <button id="new-owner-button" className="add-new-owner-row">Add New Owner</button>
                    </div>
                    <label>Secondary Owner (Optional): </label>
                    <select id="animal-form-owner-secondary" className="animal-form-inputs" value={secondaryOwnerId} onChange={onChangeSecondaryOwnerId}>
                        <option value="">Select an Owner</option>
                        {secondaryOwnerOption()}
                    </select>
                    <label>Attending Veterinarian: </label>
                    <select id="animal-form-vet" className="animal-form-inputs" value={vetId} onChange={onChangeVetId}>
                        <option>Select a Veterinarian</option>
                        {vetOptions()}
                    </select>
                    <label>Visit Date: </label>
                    <input id="animal-form-visit-date" className="animal-form-inputs" type="date" value={newAnimalData.visit_date} onChange={onChangeVisitDate}/>
                    <label>Visit Summary: </label>
                    <input id="animal-form-visit-summary" className="animal-form-inputs" type="textarea" value={newAnimalData.visit_summary} onChange={onChangeVisitSummary}/>
                    <button id="new-animal-submit-button" onClick={handleSubmit}>Submit</button>
                </form>
            </main>
        </>
    )
}

export default NewAnimal;