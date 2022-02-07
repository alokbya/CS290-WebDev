import React from "react";
import StoreTable from "../components/StoreTable";
import ZipSearch from "../components/ZipSearch";


function StoreListPage({stores}) {
    return (
        <>
            <article>
                <section>
                    <h2>Store List Page</h2>
                    <p>Do stuff</p>
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