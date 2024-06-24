import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import About from './About';
import Contact from './Contact';
import SingleMode from './SingleMode';


const PageList = () => {

    //��tokenʱĬ��Ϊδ��¼״̬������loginҳ��
    //��tokenʱĬ��Ϊ��¼״̬������dashboardҳ��

    return (
        <div>
            {/* ����ҳ����������� */}
            <Routes>
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/SingleMode" element={<SingleMode />} />
            </Routes>


            {/* ���º���Ӧ������βҳ���� */}
            <nav>
                <ul>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                        <Link to="/SingleMode">SingleMode</Link>
                    </li>
                </ul>
            </nav>

        </div>
    );
}

export default PageList;