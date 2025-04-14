
import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="laptopsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Laptops</a>
                        <ul className="dropdown-menu" aria-labelledby="laptopsDropdown">
                            <li><NavLink className="dropdown-item" to="/laptops/gaming">Gaming Laptops</NavLink></li>
                            <li><NavLink className="dropdown-item" to="/laptops/mainstream">Mainstream Laptops</NavLink></li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="handheldDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Handheld Devices</a>
                        <ul className="dropdown-menu" aria-labelledby="handheldDropdown">
                            <li><NavLink className="dropdown-item" to="/handheld/cellphones">Cellphones</NavLink></li>
                            <li><NavLink className="dropdown-item" to="/handheld/tablets">Tablets</NavLink></li>
                            <li><NavLink className="dropdown-item" to="/handheld/consoles">Consoles</NavLink></li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="desktopsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Desktops</a>
                        <ul className="dropdown-menu" aria-labelledby="desktopsDropdown">
                            <li><NavLink className="dropdown-item" to="/desktops/gaming-entry">Gaming Entry</NavLink></li>
                            <li><NavLink className="dropdown-item" to="/desktops/mainstream-entry">Mainstream Entry</NavLink></li>
                        </ul>
                    </li>

                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="networkDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Network</a>
                        <ul className="dropdown-menu" aria-labelledby="networkDropdown">
                            <li><NavLink className="dropdown-item" to="/network/wifi-routers">Wi-Fi Routers</NavLink></li>
                            <li><NavLink className="dropdown-item" to="/network/home-mesh">Home Mesh Wi-Fi</NavLink></li>
                            <li><NavLink className="dropdown-item" to="/network/desktop-switches">Desktop Switches</NavLink></li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="componentsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Components</a>
                        <ul className="dropdown-menu" aria-labelledby="componentsDropdown">
                            <li><NavLink className="dropdown-item" to="/components/sodimm-ram">SODIMM RAM</NavLink></li>
                            <li><NavLink className="dropdown-item" to="/components/solid-state-drives">Solid State Drives</NavLink></li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="brandsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Shop by Brands</a>
                        <ul className="dropdown-menu" aria-labelledby="brandsDropdown">
                            <li><NavLink className="dropdown-item" to="/brands/asus">ASUS</NavLink></li>
                            <li><NavLink className="dropdown-item" to="/brands/acer">Acer</NavLink></li>
                            <li><NavLink className="dropdown-item" to="/brands/lenovo">Lenovo</NavLink></li>
                            <li><NavLink className="dropdown-item" to="/brands/msi">MSI</NavLink></li>
                            <li><NavLink className="dropdown-item" to="/brands/dell">Dell</NavLink></li>
                            <li><NavLink className="dropdown-item" to="/brands/hp">HP</NavLink></li>
                            <li><NavLink className="dropdown-item" to="/brands/jisulife">JisuLife</NavLink></li>
                            <li><NavLink className="dropdown-item" to="/brands/epson">Epson</NavLink></li>
                            <li><NavLink className="dropdown-item" to="/brands/a4tech">A4Tech</NavLink></li>
                            <li><NavLink className="dropdown-item" to="/brands/playstation">PlayStation</NavLink></li>
                            <li><NavLink className="dropdown-item" to="/brands/logitech">Logitech</NavLink></li>
                            <li><NavLink className="dropdown-item" to="/brands/aula">Aula</NavLink></li>
                            <li><NavLink className="dropdown-item" to="/brands/huawei">Huawei</NavLink></li>
                            <li><NavLink className="dropdown-item" to="/brands/xiaomi">Xiaomi</NavLink></li>
                            <li><NavLink className="dropdown-item" to="/brands/samsung">Samsung</NavLink></li>
                            <li><NavLink className="dropdown-item" to="/brands/gigahertz">Gigahertz</NavLink></li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="replacementDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Replacement Parts</a>
                        <ul className="dropdown-menu" aria-labelledby="replacementDropdown">
                            <li><NavLink className="dropdown-item" to="/replacement-parts/lcd">LCD Replacement Parts</NavLink></li>
                            <li><NavLink className="dropdown-item" to="/replacement-parts/io-board">IO Board Replacement Parts</NavLink></li>
                            <li><NavLink className="dropdown-item" to="/replacement-parts/battery">Battery Replacement Parts</NavLink></li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/repair-and-service">Repair and Services</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
);



export default Navigation;