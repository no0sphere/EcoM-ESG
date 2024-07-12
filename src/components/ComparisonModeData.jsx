import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';




const options_industry = [
    { value: 'financials', label: 'Financials' },
    { value: 'health care', label: 'Health Care' },
    { value: 'energy', label: 'Energy' },
    { value: 'industrials', label: 'Industrials' },
    { value: 'materials', label: 'Materials' },
    { value: 'utilities', label: 'Utilities' },
    { value: 'telecommunication services', label: 'Telecommunication Services' },
    { value: 'real estate', label: 'Real Estate' },
    { value: 'consumer staples', label: 'Consumer Staples' },
    { value: 'consumer discretionary', label: 'Consumer Discretionary' },
    { value: 'information technology', label: 'Information Technology' }
];

const options_company = [
    { value: 'apple', label: 'apple' },
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
];

const options_year = [
    { value: '2022', label: '2022' },
    { value: '2023', label: '2023' },
    { value: '2024', label: '2024' }
];


const ComparisonModeData = () => {

    const [selectedCompany, setSelectedCompany] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);

    const handleCompanyChange = (selectedCompany) => {
        setSelectedCompany(selectedCompany);
    };

    const handleYearChange = (selectedYear) => {
        setSelectedYear(selectedYear);
    }


    const CompanySlots = ["slot0", "slot1", "slot2", "slot3"];

    const backgroundColors = ['#FFFFFF', '#F0F0F0'];

        /*
    const users = [
        { id: 1, name: 'Alice', age: 25 },
        { id: 2, name: 'Bob', age: 30 },
        { id: 3, name: 'Carol', age: 22 }
        ];


    const UserItem = ({ user }) => (
        <li>
            {user.name} - Age: {user.age}
        </li>
    );
    */


    const [ChosenCompanyNames, setChosenCompanyData] = useState(["", "", "", ""]);
    const [ChosenCompanyYears, setChosenCompanyYears] = useState(["", "", "", ""]);
    const [popWindowVisible, setPopWindowVisible] = useState(false);
    const [SlotContentVisible, setSlotContentVisible] = useState([false, false, false, false]);

    // Rating data of 4 companies
    //const [companyData, setCompanyData] = useState([0, 0, 0, 0]);
    // Current slot that user is selecting
    const [CurrentSlot, setCurrentSlot] = useState(null);
    const [CurrentSlotIndex, setCurrentSlotIndex] = useState(null);

    //Add company button onClick function
   const handleSlotClick = (SlotId,index) => {
       console.log("Add company button clicked");
       setCurrentSlot(SlotId);
       console.log("CurrentSlot: ", CurrentSlot);
       setCurrentSlotIndex(index);
       //turn CompanySelecting div to display
       setPopWindowVisible(true);
    };


    const handleCompanySelectingConfirm = () => {
        console.log("Company selected");
        //turn CompanySelecting div to display
        console.log("CurrentSlot: ", CurrentSlot);
        console.log("selectedCompany: ", selectedCompany);
        console.log("selectedYear: ", selectedYear);
        setPopWindowVisible(false);
        let NewSlotContentVisible = [...SlotContentVisible];
        NewSlotContentVisible[CurrentSlotIndex] = true;
        setSlotContentVisible(NewSlotContentVisible);
        let NewCompanySelected = [...ChosenCompanyNames];
        NewCompanySelected[CurrentSlotIndex] = selectedCompany.label;
        setChosenCompanyData(NewCompanySelected);
        let NewCompanyYear = [...ChosenCompanyYears];
        NewCompanyYear[CurrentSlotIndex] = selectedYear.label;  
        setChosenCompanyYears(NewCompanyYear);
        console.log(document.getElementById(CurrentSlot + "Company"));



    }


    let SlotContent = ({ id, index }) => {
        return (
            <div id = {id} style={{ display: SlotContentVisible[index]? 'block' : 'none' }}>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => RemoveCompany(index)}></button>
                <div id={id + "Name&year"} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px' }}>
                    <h2 id={id + "Name"} style={{ marginRight: '5px' }}>{ChosenCompanyNames[index] ? ChosenCompanyNames[index] : 'No company selected'}</h2>
                    <h2 id={id + "Year"} style={{ marginLeft: '5px' }}>{ChosenCompanyYears[index] ? ChosenCompanyYears[index] : 'No year selected'}</h2>
                </div>
            </div>

        );
    };

    const RemoveCompany = (index) => {
        console.log("Remove company button clicked");
        let newSlotContentVisible = [...SlotContentVisible];
        newSlotContentVisible[index] = false;
        setSlotContentVisible(newSlotContentVisible);
        let NewCompanySelected = [...ChosenCompanyNames];
        NewCompanySelected[index] = "";
        setChosenCompanyData(NewCompanySelected);
        let NewCompanyYear = [...ChosenCompanyYears];
        NewCompanyYear[index] = "";
        setChosenCompanyYears(NewCompanyYear);

    }



    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '10px', margin: '20px', width: '80%' }}>
            {CompanySlots.map((element, index) => (
                <div id={element} key={index} style={{ textAlign: 'center', height: '50vh', width: '20vw', borderRadius: '5px', backgroundColor: backgroundColors[index % 2] }}>
                    <div id = {element + "Content" } style = {{ display : SlotContentVisible[index] ? 'none' : 'block' }}>
                        <div style={{ marginBottom: '10px', color: '#555' }}>{element}</div>
                        <button id= {element + "AddCompany"} style={{ cursor: 'pointer' }} onClick={() => handleSlotClick(element,index)}>
                            <span style={{ marginRight: '5px' }}>+</span>
                            Add Company
                        </button>
                    </div>
                    <SlotContent id={element + "Company"} index = { index}/>
                </div>
            ))}
            <div id="CompanySelecting" style={{
                display: popWindowVisible ? 'flex' : 'none' , position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1000 , justifyContent: 'center', alignItems: 'center'
            }}>
                <div style={{ width: '50%', height: '50%', backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '5px' }}>
                    <button type="button" className="btn-close" aria-label="Close" onClick={() => setPopWindowVisible(false)}></button>
                    <div>
                        <h2>Company Selection</h2>
                        <Select options={options_industry} placeholder='industry '/>
                        <Select options={options_company} placeholder='company' onChange={handleCompanyChange} value={selectedCompany} />
                        <Select options={options_year} placeholder='year' onChange={handleYearChange} value={selectedYear} />
                        <button id="CompanySelectingConfirm" style={{ marginTop: '10px' }} onClick={handleCompanySelectingConfirm}>Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ComparisonModeData;