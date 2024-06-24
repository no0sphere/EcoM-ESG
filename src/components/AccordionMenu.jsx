import React, { useState } from 'react';

const AccordionMenu = () => {
    const toggleAccordion = (event) => {
        const button = event.target.closest('.accordion-button');
        const card = button.closest('.accordion-item');
        const collapse = card.querySelector('.accordion-collapse');

        if (!collapse) {
            console.error('Expected .accordion-collapse to be a child of the accordion item, but none was found.');
            return;
        }

        if (collapse.classList.contains('show')) {
            collapse.classList.remove('show');
            button.classList.add('collapsed');
        } else {
            collapse.classList.add('show');
            button.classList.remove('collapsed');
        }
    };

    const handleInputClick = (event) => { // Prevent the accordion from toggling when clicking on an input
        event.stopPropagation();
    };

    return (
        <div className="accordion" id="mainAccordion">
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                    <button
                        className="accordion-button collapsed"
                        type="button"
                        onClick={toggleAccordion}
                    >
                        <div className="d-flex align-items-center">
                            Main Item 1
                        </div>
                    </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse">
                    <div className="accordion-body">
                            <div className="accordion-item accordion-body">
                                <div className="d-flex align-items-center">
                                    <input type="checkbox" className="me-2" />
                                    Sub Item 1
                                </div>
                            </div>
                            <div className="accordion-item accordion-body">
                                <div className="d-flex align-items-center">
                                    <input type="checkbox" className="me-2" />
                                    Sub Item 2
                                </div>
                            </div>
                            <div className="accordion-item accordion-body">
                                <div className="d-flex align-items-center">
                                    <input type="checkbox" className="me-2" />
                                    Sub Item 3
                                </div>
                            </div>
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                    <button
                        className="accordion-button collapsed"
                        type="button"
                        onClick={toggleAccordion}
                    >
                        <div className="d-flex align-items-center">
                            Main Item 2
                        </div>
                    </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse">
                    <div className="accordion-body">
                        <div className="accordion" id="subAccordion2">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="subHeadingThree">
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        onClick={toggleAccordion}
                                    >
                                        <div className="d-flex align-items-center">
                                            <input type="checkbox" className="me-2" onClick={handleInputClick} />
                                            Sub Item 1
                                            <input type="text" className="ms-2" placeholder="Input here" onClick={handleInputClick} />
                                        </div>
                                    </button>
                                </h2>
                                <div id="subCollapseThree" className="accordion-collapse collapse">
                                    <div className="accordion-body">
                                        <div className="accordion-item accordion-body">
                                            <div className="d-flex align-items-center ">
                                                <input type="checkbox" className="me-2" />
                                                Content for Sub Item 1
                                                    <input type="text" className="ms-2" placeholder="Input here" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="subHeadingFour">
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        onClick={toggleAccordion}
                                    >
                                        <div className="d-flex align-items-center">
                                            <input type="checkbox" className="me-2" onClick={handleInputClick} />
                                            Sub Item 2
                                            <input type="text" className="ms-2" placeholder="Input here" onClick={handleInputClick} />
                                        </div>
                                    </button>
                                </h2>
                                <div id="subCollapseFour" className="accordion-collapse collapse">
                                    <div className="accordion-body">
                                        <div className="accordion-item accordion-body">
                                            <div className="d-flex align-items-center ">
                                                <input type="checkbox" className="me-2" />
                                                Content for Sub Item 2
                                                <input type="text" className="ms-2" placeholder="Input here" />
                                            </div>
                                        </div>
                                        <div className="accordion-item accordion-body">
                                            <div className="d-flex align-items-center ">
                                                <input type="checkbox" className="me-2" />
                                                Content for Sub Item 2
                                                <input type="text" className="ms-2" placeholder="Input here" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccordionMenu;
