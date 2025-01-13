import { Link } from "react-router-dom";

function AnimalCard({ id, name, vet, DOB, species, owners, last_visit_date, last_visit_summary, setAnimalsList}) {

    function handleDelete() {
        fetch(`http://127.0.0.1:5555/animals/${id}`, {
            method: "DELETE",
        })
        .then((r) => r.json())
        .then(() => setAnimalsList((prevList) => prevList.filter((animal) => animal.id !== id)))
    }

    return (
        <div className="animal-card">
            <p id="animal-card-name" className="animal-card-items">{name}</p>
            <p id="animal-card-vet" className="animal-card-items">Assigned Veterinarian: {vet}</p>
            <p id="animal-card-species" className="animal-card-items">Species: {species}</p>
            <p id="animal-card-dob" className="animal-card-items">Date of Birth: {DOB}</p>
            <p id="animal-card-owner" className="animal-card-items">Owner(s): {owners}</p>
            <p id="animal-card-visit" className="animal-card-items">Last Visit: {last_visit_date}</p>
            <p id="animal-card-summary" className="animal-card-items">Visit Summary: {last_visit_summary}</p>
            <Link className="animal-card-button" to={`/update-animal/${id}`}>Edit</Link>
            <button className="animal-card-button" onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default AnimalCard;