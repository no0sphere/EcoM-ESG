import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AccordionMenu = () => {

    const MenuStyle = {padding: '10px', margin: '20px', width: '28%'};

    const [inputs, setInputs] = useState({
        input1: '1.00',
        input1_1: '1.00',
        input2: '1.00',
        input2_1: '1.00',
        input2_2: '1.00'
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputs((prevInputs) => ({
            ...prevInputs,
            [name]: value
        }));
    };

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
        <div className="accordion" id="mainAccordion" style={MenuStyle}>
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                    <button
                        className="accordion-button collapsed"
                        type="button"
                        onClick={toggleAccordion}
                        data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"
                    >
                        <div className="d-flex align-items-center">
                            Frameworks
                        </div>
                    </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse">
                    <div className="accordion-body">
                            <div className="accordion-item accordion-body">
                                <div className="d-flex align-items-center">
                                <input type="radio"
                                    className="me-2"
                                    name="FrameworkRadio"
                                    value="subItem1" />
                                    Sub Item 1
                                </div>
                            </div>
                            <div className="accordion-item accordion-body">
                                <div className="d-flex align-items-center">
                                <input type="radio"
                                    className="me-2"
                                    name="FrameworkRadio"
                                    value="subItem2" />
                                    Sub Item 2
                                </div>
                            </div>
                            <div className="accordion-item accordion-body">
                                <div className="d-flex align-items-center">
                                <input type="radio"
                                    className="me-2"
                                    name="FrameworkRadio"
                                    value="subItem3" />
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
                            Metrics & Indicators
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
                                            <input type="text" className="ms-2"
                                                name="input1"
                                                value={inputs.input1}
                                                onChange={handleInputChange}
                                                onClick={handleInputClick}
                                                style={{ width: '20%', fontSize: '12px' }} />
                                        </div>
                                    </button>
                                </h2>
                                <div id="subCollapseThree" className="accordion-collapse collapse">
                                    <div className="accordion-body">
                                        <div className="accordion-item accordion-body">
                                            <div className="d-flex align-items-center ">
                                                <input type="checkbox" className="me-2" />
                                                Content for Sub Item 1
                                                <input type="text"
                                                    className="ms-2"
                                                    name="input1_1"
                                                    value={inputs.input1_1}
                                                    onChange={handleInputChange}
                                                    style={{ width: '20%', fontSize: '12px' }} />
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
                                            <input type="text"
                                                className="ms-2"
                                                name="input2"
                                                value={inputs.input2}
                                                onChange={handleInputChange}
                                                onClick={handleInputClick}
                                                style={{ width: '20%', fontSize: '12px' }} />
                                        </div>
                                    </button>
                                </h2>
                                <div id="subCollapseFour" className="accordion-collapse collapse">
                                    <div className="accordion-body">
                                        <div className="accordion-item accordion-body">
                                            <div className="d-flex align-items-center ">
                                                <input type="checkbox" className="me-2" />
                                                Content for Sub Item 2
                                                <input type="text"
                                                    className="ms-2"
                                                    name="input2_1"
                                                    value={inputs.input2_1}
                                                    onChange={handleInputChange}
                                                    style={{ width: '20%', fontSize: '12px' }} />
                                            </div>
                                        </div>
                                        <div className="accordion-item accordion-body">
                                            <div className="d-flex align-items-center ">
                                                <input type="checkbox" className="me-2" />
                                                Content for Sub Item 2
                                                <input type="text"
                                                    className="ms-2"
                                                    name="input2_2"
                                                    value={inputs.input2_2}
                                                    onChange={handleInputChange}
                                                    style={{ width: '20%', fontSize: '12px' }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                    <button
                        className="accordion-button collapsed"
                        type="button"
                        onClick={toggleAccordion}
                    >
                        <div className="d-flex align-items-center">
                            Additional Indicators
                        </div>
                    </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse">
                    <div className="accordion-body">
                        <div className="accordion-item accordion-body">
                            <div className="d-flex align-items-center">
                                <input type="checkbox"
                                    className="me-2" />
                                Sub Item 1
                            </div>
                        </div>
                        <div className="accordion-item accordion-body">
                            <div className="d-flex align-items-center">
                                <input type="checkbox"
                                    className="me-2" />
                                Sub Item 2
                            </div>
                        </div>
                        <div className="accordion-item accordion-body">
                            <div className="d-flex align-items-center">
                                <input type="checkbox"
                                    className="me-2" />
                                Sub Item 3
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccordionMenu;
