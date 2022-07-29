import React from 'react'

export const NothingSelected = () => {
    return (
        <div className="journal__nothing-content">
            <p>
                Select something
                <br />
                or create an entry!
            </p>

            <i className="far fa-star fa-4x mt-5"></i>
        </div>
    )
}
