import React, { useState } from "react";

function ZipSearch() {
    const [zip, setZip] = useState('');
    const [zipCounter, setZipCounter] = useState(0);

    // Return JSX
    return (
        <>
            <form className="zip-form" action="" method="">
                <fieldset>
                    <legend>Zip Search</legend>
                    <label className="form-label">Enter your zip code, and submit your data</label>
                    <input 
                        type="number" required
                        id="zip"
                        name="zipCode"
                        placeholder="97330"
                        maxLength="5"
                        size="5"
                        min="5"
                        onChange={e=> {
                            setZip(e.target.value);
                            }}>                    
                    </input>
                    <button className="submit-button"
                        onClick={e => {
                            setZip(e.target.value);
                            alert(`You entered ${zip} into the "Zip Search" form!`);
                        }}>
                            Submit
                    </button>
                </fieldset>
            </form>
        </>
    );
}
export default ZipSearch;