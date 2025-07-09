import React from 'react';

export default function Places() {
    return (
        <div className="container py-5">
            <h2 className="mb-4 text-center">Lieux à visiter</h2>
            <div className="row">
                <div className="col-md-4 mb-4">
                    <div className="card shadow h-100">
                        <div className="card-body text-center">
                            <h5 className="card-title">Lieu 1</h5>
                            <p className="card-text text-muted">Description à venir...</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card shadow h-100">
                        <div className="card-body text-center">
                            <h5 className="card-title">Lieu 2</h5>
                            <p className="card-text text-muted">Description à venir...</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card shadow h-100">
                        <div className="card-body text-center">
                            <h5 className="card-title">Lieu 3</h5>
                            <p className="card-text text-muted">Description à venir...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
