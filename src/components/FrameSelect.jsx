import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";

const FrameSelect = () => {
    const handleCreateFrame = () => {
        alert('Create your frame clicked!');
    };

    const handleSelect = (frameId) => {
        alert(`Frame ${frameId} selected!`);

    };

    const frames = [
        { id: 1, name: 'Frame name', intro: 'intro: this is frame A, which is used by ..............' },
        { id: 2, name: 'Frame name', intro: 'intro: this is frame A, which is used by ..............' },
        { id: 3, name: 'Frame name', intro: 'intro: this is frame A, which is used by ..............' },
        { id: 4, name: 'Frame name', intro: 'intro: this is frame A, which is used by ..............' },
        { id: 5, name: 'Frame name', intro: 'intro: this is frame A, which is used by ..............' },
        { id: 6, name: 'Frame name', intro: 'intro: this is frame A, which is used by ..............' },
        { id: 7, name: 'Frame name', intro: 'intro: this is frame A, which is used by ..............' },

    ];

    return (
        <div className="container mt-5">
            <div className="row mb-4">
                <div className="col-3 mb-4">
                    <div
                        className="card h-100 d-flex align-items-center justify-content-center"
                        style={{
                            border: '2px dashed #6c757d',
                            cursor: 'pointer'
                        }}
                        onClick={handleCreateFrame}
                    >
                        <div className="text-center">
                            <p className="mb-0">+</p>
                            <p>Create your frame</p>
                        </div>
                    </div>
                </div>
                {frames.map(frame => (
                    <div key={frame.id} className="col-3 mb-4">
                        <div className="card h-100 d-flex flex-column justify-content-between">
                            <div className="card-body">
                                <h5 className="card-title">{frame.name}</h5>
                                <p className="card-text">{frame.intro}</p>
                            </div>
                            <div className="card-footer bg-transparent border-0 d-flex justify-content-center">
                                <button className="btn btn-outline-primary" onClick={() => handleSelect(frame.id)}>
                                    <Link to="/CompanySearch" style={{ textDecoration: 'none' }}>Select</Link>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FrameSelect;
