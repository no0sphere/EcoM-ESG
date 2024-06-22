import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import About from './About';
import Contact from './Contact';

const PageList = () => {

    //无token时默认为未登录状态，进入login页面
    //有token时默认为登录状态，进入dashboard页面

    return (
        <div>
            {/* 新增页面在这里加入 */}
            <Routes>
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>


            {/* 以下后续应被导航尾页代替 */}
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