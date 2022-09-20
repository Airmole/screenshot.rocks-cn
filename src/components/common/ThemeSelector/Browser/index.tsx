import React from "react";
import {view} from "@risingstack/react-easy-state";
import {app} from "../../../../stores/appStore";
import {styles} from "./styles";
import {BrowserFrame} from "../../Frames/Browser";
import {BrowserThemes, browserThemes} from "../../Frames/Browser/styles";
import {ColorPicker} from "../../ColorPicker";
import {rgba2hexa} from "../../../../utils/image";
import {browserStore} from "../../../../stores/browserStore";

export const BrowserThemeSelector = view(() => {
    const handleThemeClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, theme: BrowserThemes) => {
        browserStore.setBrowserTheme(theme);
    };

    const handleCustomThemeClick = (): void => {
        browserStore.setBrowserTheme((browserStore.settings.activeTheme === BrowserThemes.Custom) ? BrowserThemes.Default : BrowserThemes.Custom);
    };

    const browserStyleMap = {
        browserChromeBgColor: '浏览器背景',
        browserControlsBgColor: '控制操作背景',
        browserControlsTextColor: '控制操作文字',
        closeButtonColor: '关闭按钮',
        maximizeButtonColor: '窗口最大化按钮',
        minimizeButtonColor: '窗口最小化按钮'
    }

    return (
        <div className={styles(app.canvasBgColor)}>
            <div className={`theme-selection ${browserStore.settings.activeTheme === BrowserThemes.Custom ? 'd-none' : ''}`}>
                {Object.keys(browserThemes).map((theme) => {
                    return (
                        <a href={'#'}
                           key={theme}
                           onClick={(e) => handleThemeClick(e, theme as any)}
                           className="d-block style-preview">
                            <BrowserFrame key={theme}
                                          showControlsOnly={true}
                                          canvasBgColor={app.canvasStyles.bgColor}
                                          canvasBgImage={app.canvasStyles.bgImage}
                                          canvasBgType={browserStore.settings.backgroundType}
                                          styles={(browserThemes as any)[theme]}
                                          isDownloadMode={false}
                                          showBoxShadow={browserStore.settings.showBoxShadow}
                                          isAutoRotateActive={false}
                            />
                        </a>
                    )
                })}
            </div>
            <div
                className={`custom-theme-settings ${browserStore.settings.activeTheme !== BrowserThemes.Custom ? 'd-none' : ''}`}>
                {Object.keys(browserStyleMap).map(browserStyle => {
                    return <div className="row" key={browserStyle}>
                        <div className="col-3">
                            <ColorPicker
                                initialColor={(browserStore.styles as any)[browserStyle]}
                                onColorChange={(color => (browserStore.styles as any)[browserStyle] = rgba2hexa(color))}
                            />
                        </div>
                        <div className="col-9">
                            <span>{(browserStyleMap as any)[browserStyle]}</span>
                        </div>
                    </div>
                })}
                <div className="row">
                    <div className="col">
                        <label htmlFor="horizontalPadding" className="form-label">
                            圆角
                        </label>
                    </div>
                    <div className="col">
                        <input
                            onChange={(e) => {
                                browserStore.styles.browserBorderRadius = (e.target.value as unknown as number)
                                browserStore.styles.controlsBorderRadius = (e.target.value as unknown as number)
                            }}
                            value={browserStore.styles.browserBorderRadius}
                            type="range"
                            className="form-range"
                            min="0"
                            max="100"
                            id="horizontalPadding"
                        />
                    </div>
                </div>
            </div>
            <button onClick={handleCustomThemeClick} className="btn btn-sm btn-link text-white w-100">
                <span>{browserStore.settings.activeTheme !== BrowserThemes.Custom ? '自定义样式' : '选择样式'}</span>
            </button>
        </div>
    );
});