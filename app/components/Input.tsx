import styled from "styled-components";
import React, { useRef, useState } from "react";
import { useFirebase } from "../context/FirebaseProvider";
import { Button } from "./Button";
import { Gifs } from "./Gifs";
import { App } from "../types/app";
import { Icon, IconGif, Close } from "../lib/icon";
import { ButtonIcon } from "./ButtonIcon";

const InputWrapper = styled.div`
    padding: 2rem;
    width: 100%;
    color: ${p => p.theme.white};
`;

const TextArea = styled.div`
    position: relative;
    font-size: 2.5rem;
`;

const TextInput = styled.div`
    background: none;
    resize: none;
    border: none;
    padding: 0 0 0.25rem;
`;

const TextPlaceholder = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    padding: 0 0 0.25rem;
    pointer-events: none;
    color: ${p => p.theme.lightGrey};
`;

const InputArea = styled.div`
    margin: 0 0 2rem;
    border-bottom: 0.1rem solid ${p => p.theme.grey};
`;

const InputControls = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const ImageWrapper = styled.div`
    position: relative;
`;

const Image = styled.img`
    max-width: 100%;
    border-radius: 2rem;
    margin: 1rem 0;
    overflow: hidden;
    background-color: ${p => p.theme.blackGrey};
`;

const ButtonRemoveImage = styled.button`
    position: absolute;
    top: 1.75rem;
    left: 0.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.5);
`;

const ButtonRemoveIcon = styled.div`
    width: 1.5rem;
    height: 1.5rem;
`;

export const Input: React.FC = () => {
    const { addTweet } = useFirebase();
    const inputRef = useRef<HTMLDivElement | null>(null);
    const [gifsActive, setGifsActive] = useState<boolean>(false);
    const [image, setImage] = useState<App.Image | null>(null);
    const [inputText, setInputText] = useState<string>("");
    const [inputContent, setInputContent] = useState<string | null>(null);

    const onSubmit = () => {
        if (!inputContent && !image) {
            return;
        }

        addTweet({ message: inputContent, image: image, date: Date.now(), id: "" });
        inputReset();
    };

    const inputReset = () => {
        setInputContent(null);
        setInputText("");
        setImage(null);

        if (inputRef.current) {
            inputRef.current.innerText = "";
        }
    };

    return (
        <InputWrapper>
            <InputArea>
                <TextArea>
                    {!inputText && <TextPlaceholder>Leave a message!</TextPlaceholder>}
                    <TextInput
                        ref={inputRef}
                        role="textbox"
                        contentEditable
                        spellCheck
                        onInput={e => {
                            const target = e.target as HTMLDivElement;
                            setInputText(target.innerText);
                            setInputContent(target.textContent);
                        }}
                        onKeyDown={e => {
                            if ("Enter" === e.key && !e.shiftKey) {
                                e.preventDefault();
                                e.stopPropagation();
                                onSubmit();
                            }
                        }}
                    />
                </TextArea>
                {image && (
                    <ImageWrapper>
                        <Image
                            src={image.url}
                            width={image.width}
                            height={image.height}
                            alt="Image Preview"
                        />
                        <ButtonRemoveImage onClick={() => setImage(null)}>
                            <ButtonRemoveIcon>
                                <Icon name="close" icon={Close} />
                            </ButtonRemoveIcon>
                        </ButtonRemoveImage>
                    </ImageWrapper>
                )}
            </InputArea>
            <InputControls>
                <ButtonIcon onClick={() => setGifsActive(true)} disabled={!!image} active>
                    <Icon name="gif" icon={IconGif} />
                </ButtonIcon>
                <Button onClick={onSubmit} disabled={!inputContent && !image}>
                    Tweet
                </Button>
            </InputControls>
            {gifsActive && (
                <Gifs onSelect={url => setImage(url)} onClose={() => setGifsActive(false)} />
            )}
        </InputWrapper>
    );
};
