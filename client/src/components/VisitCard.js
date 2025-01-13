import { Link } from "react-router-dom";

function VisitCard({ id, pet, vet, date, summary, setVisits}) {

    function handleDelete() {
        fetch(`http://127.0.0.1:5555/visits/${id}`, {
            method: "DELETE",
        })
        .then((r) => r.json())
        .then(() => setVisits((prevVisits) => prevVisits.filter((visit) => visit.id !== id)))
    }

    return (
        <div className="visit-card">
            <p id="visit-card-id" className="visit-card-items">Visit ID: {id}</p>
            <p id="visit-card-name" className="visit-card-items">Pet: {pet.name}</p>
            <p id="visit-card-vet" className="visit-card-items">Assigned Veterinarian: {`${vet.first_name} ${vet.last_name}`}</p>
            <p id="visit-card-visit" className="visit-card-items">Visit Date: {date}</p>
            <p id="visit-card-summary" className="visit-card-items">Visit Summary: {summary}</p>
            <Link className="visit-card-button" to={`/update-visit/${id}`}>Edit</Link>
            <button className="visit-card-button" onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default VisitCard;