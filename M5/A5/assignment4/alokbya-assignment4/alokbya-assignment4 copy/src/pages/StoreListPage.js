// Import Dependencies
import React from "react";

// Import Pages
import StoreTable from "../components/StoreTable";
import ZipSearch from "../components/ZipSearch";


function StoreListPage({stores}) {
    return (
        <>
            <article>
                <section>
                    <h2>Store List</h2>
                    <p>Check out our stores in the table below. Enter your zip code to find stores near you!</p>
                    <StoreTable stores={stores}/>
                </section>
                <section>
                    <ZipSearch />
                </section>
            </article>            
        </>
    );
}

export default StoreListPage;