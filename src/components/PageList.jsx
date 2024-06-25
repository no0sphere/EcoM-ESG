import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import About from './About';
import Contact from './Contact';
import SingleMode from './SingleMode';
import Header from './Header';
import Footer from './Footer';

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
                {/* <Route path="/help" component={HelpPage} />
                <Route path="/download-report" component={ReportPage} />
                <Route path="/logout" component={LogoutPage} /> */}
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