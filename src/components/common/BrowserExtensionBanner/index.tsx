import React from "react";
import {styles} from "./styles";
import {useBrowserType} from "../../../hooks/useBrowserType";
import {Browsers} from "../../../types";

export const BrowserExtensionBanner = () => {
    const browser = useBrowserType();

    const availableExtension = {
        [Browsers.Firefox]: {
            link: 'https://addons.mozilla.org/en-US/firefox/addon/one-click-design-mockups',
            name: 'FireFox Add-On',
        },
        [Browsers.Edge]: {
            link: 'https://microsoftedge.microsoft.com/addons/detail/clennbaklmghlnlamipjmfikdnlhiaem',
            name: 'Edge Add-On',
        },
        [Browsers.Chrome]: {
            link: 'https://chrome.google.com/webstore/detail/screenshotrocks-one-click/oolmphedpohnagciifbnfpemadolahki/',
            name: 'Chrome Extension',
        }
    };

    if (!availableExtension.hasOwnProperty(browser)) {
        return null;
    }

    const {link, name} = (availableExtension as any)[browser];
    return (
        <div className={styles()}>
            <span role="img">🚀</span> 试试 <a target="_blank" href={link}><span>{name}</span></a> 官方扩展，任意页面生成截图样机模型


        </div>
    );
}