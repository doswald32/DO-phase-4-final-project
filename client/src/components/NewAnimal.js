function NewAnimal() {
    return (
        <>
            <main>
                <form className="new-animal-form">
                    <label>Name: </label>
                    <input id="animal-form-name" className="animal-form-inputs" type="text" placeholder="Name"/>
                    <label>DOB: </label>
                    <input id="animal-form-dob" className="animal-form-inputs" type="date"/>
                    <label>Species: </label>
                    <input id="animal-form-species" className="animal-form-inputs" type="text" placeholder="Species"/>
                    <label>Owner Name: </label>
                    <input id="animal-form-owner" className="animal-form-inputs" type="text" placeholder="Owner Name"/>
                    <label>Visit Date: </label>
                    <input id="animal-form-visit" className="animal-form-inputs" type="date"/>
                </form>
            </main>
        </>
    )
}

export default NewAnimal;