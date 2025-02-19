import React, {useCallback, useState} from "react";
import {view} from "@risingstack/react-easy-state";
import {app} from '../../../stores/appStore'
import {useDropzone} from "react-dropzone";
import {styles} from "./styles";
import {validURL} from "../../../utils/url";
import {routeStore} from "../../../stores/routeStore";

export const ImageSelector = view(() => {
    const existingUrl = () => {
        const parsedUrl = new URL(window.location.href);
        if(parsedUrl.searchParams.get('text')){
            return parsedUrl.searchParams.get('text');
        }
        return null;
    }

    const [urlValue, setUrlValue] = useState(existingUrl());
    const [urlIsInvalid, setUrlIsInvalid] = useState(false);
    const [urlLoading, setUrlLoading] = useState(false);
    const [requestFailed, setRequestFailed] = useState(false);
    const [enableMobileScreenshot, setEnableMobileScreenshot] = useState(false);

    const onDrop = useCallback(files => {
        if (files && files[0]) {
            const fileReader = new FileReader();
            fileReader.addEventListener("load", e => app.setImageData(e.target.result as string));
            fileReader.readAsDataURL(files[0]);
        }
    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleUrlEnter();
        }
    };

    const handleUrlEnter = () => {
        if (!validURL(urlValue)) {
            setUrlIsInvalid(true);
            return;
        }

        setUrlLoading(true);
        fetch(`https://2wg20nrbv4.execute-api.eu-west-1.amazonaws.com/default/screenshot?url=${urlValue}${enableMobileScreenshot ? '&mobile=1' : ''}`)
            .then(response => response.json())
            .then(data => app.setImageData(`data:image/png;base64, ${data.imageBase64}`))
            .catch(() => {
                setUrlLoading(false);
                setRequestFailed(true);
            })
            .finally(() => setUrlLoading(false));
    }

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!urlIsInvalid) {
            setUrlIsInvalid(false);
        }
        setUrlValue(e.target.value);
    }

    return (
        <div className={`${styles(routeStore.currentRoute)} ${isDragActive ? ' dragActive' : ''}`}>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <div className="drop-here">拖拽图片到此...</div> :
                        <div>
                            <div className="dropzone">
                                <p><b>拖拽</b>, <b>粘贴</b> 或 <b>点击</b> 此处上传图像...</p>
                                <p>或输入 URL</p>
                            </div>
                        </div>
                }
            </div>
            <div className="input-group url-form">
                <input
                    disabled={urlLoading}
                    onKeyDown={handleEnterKey}
                    onChange={handleUrlChange}
                    type="text"
                    className={`form-control ${urlIsInvalid || requestFailed ? 'is-invalid' : ''}`}
                    placeholder="https://your-website.com"
                    value={urlValue}
                />
                <div className="input-group-text">
                    <label htmlFor="mobile">Mobile</label>
                    <input onChange={() => setEnableMobileScreenshot(!enableMobileScreenshot)}
                           checked={enableMobileScreenshot}
                           id="mobile"
                           className="form-check-input ml-2"
                           type="checkbox"
                           value="1"
                    />
                </div>
                <button onClick={handleUrlEnter} disabled={urlLoading} className="btn btn-primary" type="button">
                    {urlLoading ? 'Working...' : 'Go'}
                </button>
                <div className="invalid-feedback">
                    {urlIsInvalid && '您输入的图片URL链接似乎无效，或无法读取到.'}
                    {requestFailed && 'URL获取图片异常，请检查图片链接，若确认图片链接正常，可能是本程序出错。'}
                </div>
            </div>
        </div>
    );
});
