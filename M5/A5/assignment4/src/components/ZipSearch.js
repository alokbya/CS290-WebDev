import React, { useState } from "react";

function ZipSearch() {
    const [zip, setZip] = useState('');
    const [zipCounter, setZipCounter] = useState(0);

    // Return JSX
    return (
        <>
            <form action="" method="">
                <fieldset>
                    <legend>Enter your data!</legend>
                    <label>Enter your zip code</label>
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
                    <button 
                        onClick={e => {
                            setZip(e.target.value);
                            alert(zip);
                        }}>
                            Submit
                    </button>
                </fieldset>
            </form>
        </>
    );
}
export default ZipSearch;