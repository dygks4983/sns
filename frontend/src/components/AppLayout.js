import React from "react";
import { Input, Menu } from "antd";
import "./AppLayout.scss";
import LogoImage from "assets/insta_logo.png";

export default function AppLayout({ children, sidebar }) {
    return (
        <div className="app">
            <div className="header">
                <h1 className="page-title">
                    <img src={LogoImage} alt="logo" width="130em"/>
                </h1>
                <div className="serch">
                    <Input.Search />
                </div>
                <div className="topnav">
                    <Menu mode="horizontal">
                        <Menu.Item>menu1</Menu.Item>
                        <Menu.Item>menu2</Menu.Item>
                        <Menu.Item>menu3</Menu.Item>
                    </Menu>
                </div>
            </div>
            <div className="contents">{children}</div>
            <div className="sidebar">
                {sidebar}
            </div>
            <div className="footer">
                &copy; 2021. Kim YoHan.
            </div>
        </div>
    );
}