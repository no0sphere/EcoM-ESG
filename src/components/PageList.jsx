import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import About from './About';
import Contact from './Contact';

const PageList = () => {
    return (
        <div>
            {/* ����ҳ����������� */}
            <Routes>
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
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
                </ul>
            </nav>

        </div>
    );
}

export default PageList;