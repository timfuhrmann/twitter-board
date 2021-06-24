import React from "react";
import styled from "styled-components";
import { Headline } from "../css/typo";
import { Content } from "../css/content";
import { Meta } from "./Meta";
import { Icon, ArrowLeft } from "../lib/icon";
import { ButtonIcon } from "./ButtonIcon";

const TemplateWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

const TemplateInner = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const HomeHeader = styled.div`
    display: flex;
    align-items: center;
    height: 5rem;
    padding: 0 2rem;
    border-bottom: 0.1rem solid ${p => p.theme.grey};

    @media ${p => p.theme.bp.l} {
        height: 6rem;
    }
`;

const TemplateStage = styled.div`
    height: 100%;
    flex: 1;
    overflow-y: scroll;
`;

const TemplateContent = styled(Content)`
    @media ${p => p.theme.bp.m} {
        border: 0.1rem solid ${p => p.theme.grey};
        border-bottom: none;
        border-top: none;
    }
`;

const TemplateStageContent = styled(TemplateContent)`
    min-height: 100%;
`;

const ButtonBackWrapper = styled.div`
    margin-right: 1rem;

    @media ${p => p.theme.bp.l} {
        margin-right: 2rem;
    }
`;

interface TemplateProps {
    title: string;
    onBack?: () => void;
}

export const Template: React.FC<TemplateProps> = ({ title, onBack, children }) => {
    return (
        <TemplateWrapper>
            <Meta title="Twitter Board" />
            <TemplateInner>
                <TemplateContent breakMobile>
                    <HomeHeader>
                        {onBack && (
                            <ButtonBackWrapper>
                                <ButtonIcon type="button" onClick={onBack} active>
                                    <Icon name="arrow-left" icon={ArrowLeft} />
                                </ButtonIcon>
                            </ButtonBackWrapper>
                        )}
                        <Headline>{title}</Headline>
                    </HomeHeader>
                </TemplateContent>
                <TemplateStage>
                    <TemplateStageContent breakMobile>{children}</TemplateStageContent>
                </TemplateStage>
            </TemplateInner>
        </TemplateWrapper>
    );
};
