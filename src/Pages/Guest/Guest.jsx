import React from 'react'

export default function Guest(props) {
    return (
        <div>
            <div className='bg-[#FF751F] p-10 px-20'>
                <div>
                    {/* Nav tabs */}
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">
                                Computing
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">
                                Bussiness
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="messages-tab" data-bs-toggle="tab" data-bs-target="#messages" type="button" role="tab" aria-controls="messages" aria-selected="false">
                                Finance
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="messages-tab" data-bs-toggle="tab" data-bs-target="#messages" type="button" role="tab" aria-controls="messages" aria-selected="false">
                                Design
                            </button>
                        </li>
                    </ul>
                    {/* Tab panes */}

                </div>
            </div>
            <div className="tab-content">
                <div className="tab-pane active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    home
                </div>
                <div className="tab-pane" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    profile
                </div>
                <div className="tab-pane" id="messages" role="tabpanel" aria-labelledby="messages-tab">
                    messages
                </div>
            </div>
        </div>
    )
}
