import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import classnames from 'classnames';

import config from 'src/config';
import Button from 'src/components/Button';
import withProps from 'src/utils/withProps';
import { inlineBlockWithVerticalMixin, sWrap, getHeightBySize } from 'src/style';
import { iconMixin as checkboxIconMixin } from 'src/components/Checkbox/style';

const { prefixCls: _prefixCls } = config;
const prefixCls = _prefixCls + '-radio';

export const iconWrapCls = prefixCls + '-icon-wrap';
export const iconCls = prefixCls + '-icon';
export const contentCls = prefixCls + '-content';
export const disabledCls = prefixCls + '-disabled';
export const checkedCls = prefixCls + '-checked';
export const extraCls = prefixCls + '-extra';

export const genStyleTypeCls = styleType => prefixCls + '-styletype-' + styleType;
export const cardHeaderCls = prefixCls + '-card-header';
export const cardContentCls = prefixCls + '-card-content';
export const cardTitleCls = prefixCls + '-card-title';

const radioCommonStyleMixin = props => {
    const {
        theme: { designTokens: DT, fontSize }
    } = props;

    return css`
        color: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
        font-size: ${fontSize};
        position: relative;
        cursor: pointer;
    `;
};

const sizeMixin = props => {
    const {
        theme: { Height },
        size
    } = props;

    return css`
        min-height: ${Height[size]};
        line-height: ${Height[size]};
    `;
};

export const sharedClassName = ({ disabled, checked, size, styleType }) =>
    classnames({
        [prefixCls]: true,
        [disabledCls]: disabled,
        [checkedCls]: checked,
        [`${prefixCls}-size-${size}`]: true,
        [genStyleTypeCls(styleType)]: true
    });

/* stylelint-disable no-duplicate-selectors */
export const RadioWrap = withProps({
    className: sharedClassName
})(
    styled('span')(props => {
        const {
            theme: { designTokens: DT }
        } = props;

        return css`
            ${radioCommonStyleMixin(props)};
            ${inlineBlockWithVerticalMixin};
            ${sizeMixin(props)};
            font-size: 0;
            color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
            > * {
                font-size: 12px;
            }

            .${contentCls} {
                display: inline-block;
                vertical-align: middle;
                max-height: 100%;
                margin-left: 8px;
            }

            &.${disabledCls} {
                cursor: default;
                color: ${DT.T_COLOR_TEXT_DISABLED};
            }
            ${iconMixin(props)};
        `;
    })
);

export const RadioListWrap = withProps({
    className: sharedClassName
})(
    styled('div')(props => {
        const {
            theme: { designTokens: DT }
        } = props;

        return css`
            ${radioCommonStyleMixin(props)};
            display: flex;
            align-items: center;
            padding: 8px 8px 8px 0;
            border-bottom: 1px solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
            color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};

            .${iconWrapCls} {
                margin: 0 12px 0 8px;
                flex-shrink: 0;
            }
            .${contentCls} {
                flex: 1 1 auto;
                line-height: 20px;
            }
            .${extraCls} {
                flex-shrink: 0;
                color: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
                margin-left: 8px;
            }
            &.${checkedCls} {
                background: ${DT.T_BUTTON_PRIMARY_COLOR_BG_DEFAULT};
                color: ${DT.T_COLOR_TEXT_DEFAULT_BRIGHT};
                .${contentCls} {
                    font-weight: bold;
                }
                .uc-fe-radio-icon-wrap {
                    border-color: ${DT.T_COLOR_TEXT_DEFAULT_BRIGHT};

                    svg {
                        fill: ${DT.T_COLOR_TEXT_DEFAULT_BRIGHT};
                    }
                }
            }
            &.${disabledCls} {
                cursor: default;
                color: ${DT.T_COLOR_TEXT_DISABLED};
                .${extraCls} {
                    color: ${DT.T_COLOR_TEXT_DISABLED};
                }
            }
            &.${checkedCls}.${disabledCls} {
                background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
            }
            ${iconMixin(props)};
        `;
    })
);

// eslint-disable-next-line no-unused-vars
const FilterStyleTypeButton = ({ styleType, ...rest }) => <Button styleType="border-gray" checkAble {...rest} />;
FilterStyleTypeButton.propTypes = {
    styleType: PropTypes.string
};

export const RadioButtonWrap = withProps({
    className: sharedClassName
})(
    styled(FilterStyleTypeButton)(props => {
        const {
            size,
            theme: { fontSize, designTokens: DT },
            disabled,
            checked
        } = props;

        return css`
            && {
                height: ${getHeightBySize(DT, size)};
                min-width: ${{ lg: 80, md: 68, sm: 56 }[size]}px;
                text-align: center;
                border-radius: 0;

                ${css`
                    font-size: ${fontSize};
                `};
                position: relative;

                ${disabled &&
                css`
                    z-index: 1;
                `};

                ${checked &&
                css`
                    color: ${DT.T_COLOR_TEXT_WHITE} !important;
                    background: ${DT.T_BUTTON_PRIMARY_COLOR_BG_DEFAULT} !important;
                    z-index: 2;
                `};

                &:hover {
                    z-index: 3;
                }
            }
        `;
    })
);

export const RadioTagWrap = withProps({
    className: sharedClassName
})(
    styled('div')(props => {
        const {
            theme: { designTokens: DT },
            checked,
            disabled
        } = props;

        return css`
            padding: 0 8px;
            cursor: pointer;
            border-radius: 2px;

            ${radioCommonStyleMixin(props)};

            ${inlineBlockWithVerticalMixin};

            ${sizeMixin(props)};

            ${checked &&
            css`
                background: ${DT.T_BUTTON_PRIMARY_COLOR_BG_DEFAULT};
                color: ${DT.T_COLOR_TEXT_DEFAULT_BRIGHT};
            `};

            ${disabled &&
            css`
                color: ${DT.T_COLOR_TEXT_DISABLED};
                cursor: default;
            `};

            ${disabled &&
            checked &&
            css`
                background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
            `};

            ${!checked &&
            !disabled &&
            css`
                :hover {
                    color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
                }
            `};
        `;
    })
);

export const RadioCardWrap = withProps({})(
    styled.div(props => {
        const {
            theme: { designTokens: DT, titleFontSize },
            disabled,
            checked
        } = props;

        return css`
            display: inline-block;
            cursor: pointer;
            background: ${DT.T_COLOR_BG_DEFAULT_NORMAL};
            box-shadow: 0px 2px 6px 0px rgba(107, 141, 233, 0.28);
            border-radius: ${DT.T_CORNER_MD};
            border: 2px solid transparent;
            transition: border-color 0.3s;
            .${cardHeaderCls} {
                padding: 8px 16px;
                line-height: 22px;
                min-height: 22px;
                font-weight: bold;
                color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
                font-size: ${titleFontSize};
                display: flex;
                justify-content: space-between;
                align-items: center;

                .${cardTitleCls} {
                    padding-right: 0px;
                }
                .${iconWrapCls} {
                    margin-left: auto;
                }
            }
            .${cardContentCls} {
                padding: 16px;
            }
            .uc-fe-select-content {
                font-size: ${DT.T_CONTROL_FONT_SIZE_SM};
                border-radius: 0;
                color: ${DT.CARD_SELECT_FONTSIZE_COLOR};
            }
            .${cardContentCls} > div > button {
                overflow: hidden;
                border-radius: 0;
                border: none;
            }

            ${checked &&
            css`
                border-color: ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};
                background: ${DT.T_COLOR_BG_DEFAULT_LIGHT};
                box-shadow: ${DT.T_SHADOW_BUTTON_HOVER};
                border: 2px solid ${DT.T_BUTTON_PRIMARY_COLOR_BG_DEFAULT};

                .${cardHeaderCls} {
                    border-color: ${DT.T_BUTTON_PRIMARY_COLOR_BG_DEFAULT};
                    border-bottom: 2px solid ${DT.T_BUTTON_PRIMARY_COLOR_BG_DEFAULT};
                }
            `};
            ${disabled &&
            css`
                cursor: default;
                box-shadow: none;
            `};
            ${disabled &&
            !checked &&
            css`
                border-color: ${DT.T_COLOR_LINE_DISABLED_DARK};
                .${cardHeaderCls} {
                    color: ${DT.T_COLOR_TEXT_DISABLED};
                    border-color: ${DT.T_COLOR_LINE_DISABLED_DARK};
                }
                .${cardContentCls} {
                    background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
                    color: ${DT.T_COLOR_TEXT_DISABLED};
                }
            `};

            ${!checked &&
            !disabled &&
            css`
                :hover {
                    border: 2px solid ${DT.T_BUTTON_PRIMARY_COLOR_BG_DEFAULT};

                    .${cardHeaderCls} {
                        border-bottom: solid 2px ${DT.T_BUTTON_PRIMARY_COLOR_BG_DEFAULT};
                        transition: border-color 0.3s;
                    }
                }
            `};
            ${iconMixin(props)};
            ${checkboxIconMixin(props)}
            > svg {
                width: 17px;
                height: 9px;
                background: ${DT.CARD_SELECT_FONTSIZE_COLOR};
            }
        `;
    })
);

export const RadioTextWrap = withProps({
    className: sharedClassName
})(
    styled('div')(props => {
        const {
            theme: { designTokens: DT, Height },
            checked,
            disabled,
            size
        } = props;

        return css`
            padding: 2px 0;
            box-sizing: border-box;
            cursor: pointer;
            height: ${Height[size]};

            > span {
                display: table;
                height: 100%;
                > span {
                    padding: 0 12px;
                    border-color: ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
                    border-style: solid;
                    border-width: 0 1px;
                    height: 100%;
                    display: table-cell;
                    vertical-align: middle;
                }
            }

            ${radioCommonStyleMixin(props)};

            ${inlineBlockWithVerticalMixin};

            ${sizeMixin(props)};
            line-height: normal;
            color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};

            ${!checked &&
            !disabled &&
            css`
                :hover {
                }
            `};

            ${checked &&
            css`
                color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
            `};

            ${disabled &&
            css`
                && {
                    color: ${DT.T_COLOR_TEXT_DISABLED};
                    cursor: default;
                }
            `};
        `;
    })
);

export const RadioGroupWrap = styled('div')(props => {
    const {
        theme: { designTokens: DT }
    } = props;
    return css`
        position: relative;
        margin-bottom: -8px;
        .${genStyleTypeCls('default')}, .${genStyleTypeCls('tag')} {
            margin-right: 8px;
            margin-bottom: 8px;

            &:last-child {
                margin-right: 0;
            }
        }
        .${genStyleTypeCls('card')} {
            margin-right: 12px;
            margin-bottom: 8px;

            &:last-child {
                margin-right: 0;
            }
        }
        .${genStyleTypeCls('text')}+.${genStyleTypeCls('text')} {
            margin-left: -1px;
        }

        .${genStyleTypeCls('button')} {
            margin-right: -1px;
            margin-bottom: 8px;
            padding: 5px 20px;
            line-height: ${DT.RADIO_FONTSIZE_LINEHEIGHT};
            &:first-of-type {
                border-radius: 4px 0px 0px 4px;
            }
            &:last-of-type {
                border-radius: 0px 4px 4px 0px;
                margin-right: 0;
            }
            &:only-of-type {
                border-radius: ${DT.T_CORNER_MD};
            }
        }
        &.${checkedCls} {
            color: ${DT.T_COLOR_TEXT_WHITE};
            background: ${DT.T_BUTTON_PRIMARY_COLOR_BG_DEFAULT};
        }

        .${genStyleTypeCls('list')} {
            &:last-of-type {
                margin-bottom: 8px;
            }
        }
    `;
});

export const SIconWrap = sWrap({
    className: iconWrapCls
})(
    styled.span(props => {
        const {
            theme: { designTokens: DT },
            checked,
            disabled
        } = props;
        return css`
            &.${iconWrapCls} {
                display: inline-block;
                box-sizing: border-box;
                overflow: hidden;
                position: relative;
                width: 16px;
                height: 16px;
                border: 1px solid ${DT.T_COLOR_LINE_DEFAULT_DARK};
                border-radius: 8px;
                vertical-align: middle;
            }

            .${iconCls} {
                visibility: hidden;
                opacity: 0;
                position: absolute;
                top: 0;
                left: 0;
            }

            ${checked &&
            css`
                &.${iconWrapCls} {
                    border-color: ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};
                }
                .${iconCls} {
                    visibility: visible;
                    opacity: 1;
                    fill: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
                }
            `}

            ${disabled &&
            css`
                &.${iconWrapCls} {
                    border-color: ${DT.T_COLOR_LINE_DISABLED_LIGHT};
                    background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
                }
            `}

            ${disabled &&
            checked &&
            css`
                &.${iconWrapCls} {
                    background: none;
                }
                .${iconCls} {
                    fill: ${DT.T_COLOR_TEXT_DISABLED};
                }
            `}
        `;
    })
);

export const iconMixin = props => {
    const {
        theme: { designTokens: DT },
        disabled,
        checked
    } = props;
    return (
        !disabled &&
        !checked &&
        css`
            :hover {
                .${iconWrapCls} {
                    border-color: ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};
                }
            }
        `
    );
};
