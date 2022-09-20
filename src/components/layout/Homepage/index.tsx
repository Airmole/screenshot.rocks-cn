import {view} from "@risingstack/react-easy-state";
import React, {useEffect} from "react";
import {Logo, LogoStyle} from "../../common/Logo";
import {styles} from "./styles";
import {BrowserThemes, browserThemes} from "../../common/Frames/Browser/styles";
import {BrowserFrame} from "../../common/Frames/Browser";
import {FaGithub, FaWhatsapp, GiShamrock, RiFacebookCircleLine, RiTwitterLine} from "react-icons/all";
import {checkForImageFromLocalstorageUrlOrPaste} from "../../../utils/image";
import {browserStore} from "../../../stores/browserStore";
import {BrowserExtensionBanner} from "../../common/BrowserExtensionBanner";

enum SocialProviders {
    Facebook,
    Twitter,
    WhatsApp,
}

export const Homepage = view(() => {
    useEffect(() => checkForImageFromLocalstorageUrlOrPaste(), []);

    const handleContactClick = () => {
        window.location.href = `mailto:admin@airmole.cn`;
    };

    const handleShareClick = (provider: SocialProviders) => {
        switch (provider) {
            case SocialProviders.WhatsApp:
                window.location.href = 'whatsapp://send?text=%E8%BD%BB%E6%9D%BE%E5%88%9B%E5%BB%BA%E7%BE%8E%E8%A7%82%E7%9A%84%E6%89%8B%E6%9C%BA%2F%E6%B5%8F%E8%A7%88%E5%99%A8%E6%88%AA%E5%9B%BE%2Bhttps%3A%2F%2Fscreenshot.rocks';
                break
            case SocialProviders.Facebook:
                window.open('https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fscreenshot.rocks');
                break;
            case SocialProviders.Twitter:
                window.open('https://twitter.com/intent/tweet?url=https%3A%2F%2Fscreenshot.rocks%20%26text%3D%E8%BD%BB%E6%9D%BE%E5%88%9B%E5%BB%BA%E7%BE%8E%E8%A7%82%E7%9A%84%E6%B5%8F%E8%A7%88%E5%99%A8%2F%E6%89%8B%E6%9C%BA%E6%88%AA%E5%9B%BE');
                break;
        }
    }

    return (
        <>
            <BrowserExtensionBanner/>
            <div className={styles()}>
                <section className="aboveFold">
                    <Logo style={LogoStyle.Light}/>
                    <h4>官方英文原站：<a href="https://screenshot.rocks/">https://screenshot.rocks/</a> ，本站由其开源代码翻译汉化部署</h4>
                    <h1>轻松创建 <span>美观的</span> 手机/浏览器 屏幕画面截图 </h1>
                    <div className="m-5">
                        <BrowserFrame
                            showControlsOnly={false}
                            styles={(browserThemes as any)[BrowserThemes.Default]}
                            isDownloadMode={false}
                            showBoxShadow={browserStore.settings.showBoxShadow}
                            hideAddressBarOverride={true}
                            isAutoRotateActive={false}
                        />
                    </div>
                </section>
                <section className="share mt-2">
                    <h2 className="text-white">分享</h2>
                    <button onClick={() => handleShareClick(SocialProviders.Facebook)}>
                        <RiFacebookCircleLine/>
                    </button>
                    <button onClick={() => handleShareClick(SocialProviders.Twitter)}>
                        <RiTwitterLine/>
                    </button>
                    <button onClick={() => handleShareClick(SocialProviders.WhatsApp)}>
                        <FaWhatsapp/>
                    </button>
                </section>
                <section className="features">
                    <div className="row align-items-center justify-center text-white">
                        <div className="col-12 col-sm-6 text-center">
                            <img alt="browser screenshot & mockup features" className="img-fluid"
                                 src="/images/home/feature-features.png"/>
                        </div>
                        <div className="col-12 p-5 col-sm-6 text-center text-sm-left">
                            <h4>创建引人注目的样机模型</h4>
                            <p>可自定义屏幕截图参数，轻松创建适合您品牌身份的屏幕截图样机模型。</p>
                        </div>
                    </div>
                    <div className="row align-items-center justify-center text-white flex-row-reverse">
                        <div className="col-12 col-sm-6 text-center">
                            <img alt="browser screenshots & mockups browser extensions" className="img-fluid"
                                 src="/images/home/feature-browser-extensions.png"/>
                        </div>
                        <div className="col-12 p-5 col-sm-6 text-center text-sm-left">
                            <h4>浏览器扩展可用</h4>
                            <p>使用我们的浏览器扩展，只需点击一下，即可从任何标签创建手机或浏览器屏幕截图。我们的扩展适用于所有主流浏览器。
                                <br/>（注意：此功能是原作者开发维护提供）</p>
                            <p>
                                <a target="_blank" href="https://addons.mozilla.org/en-US/firefox/addon/one-click-design-mockups">Firefox</a>, <a target="_blank"
                                href="https://chrome.google.com/webstore/detail/screenshotrocks-one-click/oolmphedpohnagciifbnfpemadolahki">Chrome</a>, <a
                                target="_blank"
                                href="https://microsoftedge.microsoft.com/addons/detail/clennbaklmghlnlamipjmfikdnlhiaem">Edge</a>
                            </p>
                        </div>
                    </div>
                    <div className="row align-items-center justify-center text-white">
                        <div className="col-12 col-sm-6 text-center">
                            <img alt="open-source browser screenshot & mockup tool" className="img-fluid"
                                 src="/images/home/feature-open-source.png"/>
                        </div>
                        <div className="col-12 p-5 col-sm-6 text-center text-sm-left">
                            <h4>开源</h4>
                            <p>
                                本应用完全 <a target="_blank" href="https://github.com/daveearley/screenshot.rocks">开源</a>, 因此您完全可以看到图片的处理过程。没有图像数据保存在我们的服务器上；所有图像处理都在浏览器或内存中进行。
                            </p>
                        </div>
                    </div>
                </section>
                <section className="footer">
                    <button className="btn btn-link">
                        原作者: &copy; {(new Date()).getFullYear()} Dave Earley.
                    </button>
                    <button className="btn btn-link" onClick={handleContactClick}>
                        Contact
                    </button>
                    <button className="btn btn-link">
                        Made In Dublin <GiShamrock/>
                    </button>
                    <button onClick={() => window.location.href = 'https://github.com/daveearley/screenshot.rocks'} className="btn btn-link github">
                        <FaGithub/>
                    </button>
                    <button onClick={() => window.location.href = 'https://github.com/Airmole'} className="btn btn-link">
                        Airmole 汉化
                    </button>
                </section>
            </div>
        </>
    );
});
