import React from 'react';

const CardDocuments = ({ title = "Default Title", items = [], path }) => {
    return (
        <div className="card card-side bg-slate-100 shadow-xl min-h-48 flex flex-col md:flex-row md:items-end">
            <figure className='flex-none md:w-48'>
                <img src={path} className="h-full w-full object-cover" alt="image"/>
            </figure>
            <div className="card-body flex-grow flex flex-col md:flex-row md:items-center md:ml-4">
                <div className="md:order-2">
                    <h2 className="card-title text-red-700 pb-3">{title}</h2>
                    <ul className="list-disc marker:text-red-700">
                        {items.length > 0 ? items.map((item, index) => (
                            <li key={index}>{item}</li>
                        )) : <li>No documents required.</li>}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CardDocuments;
