import React, { HTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import classnames from 'classnames';

import config from 'src/config';
import {
  inlineBlockWithVerticalMixin,
  sWrap,
  Theme,
  getHeightBySize,
  getPaddingBySize,
  offsetPaddingBySize,
  transitionFlat,
  offsetHeightBySize,
  getMiddleHeightBySize
} from 'src/style';

import { StyleTypes, Sizes, Shapes } from '../shared';

const { prefixCls: _prefixCls } = config;
const prefixCls = _prefixCls + '-button';
export const iconCls = prefixCls + '-icon';

interface SButtonProps {
  styleType: (typeof StyleTypes)[number];
  size: (typeof Sizes)[number];
  shape?: (typeof Shapes)[number];
  loading?: boolean;
  disabled?: boolean;
  fakeDisabled?: boolean;
  checkAble?: boolean;
  checked?: boolean;
  block?: boolean;
}
type SButtonPropsWithTag = SButtonProps & HTMLAttributes<HTMLButtonElement>;
type SButtonPropsFinal = SButtonPropsWithTag & { theme: Theme };

const sizeMixin = (props: SButtonPropsFinal) => {
  const {
    size,
    theme: { designTokens: DT }
  } = props;

  return css`
    height: ${getMiddleHeightBySize(DT, size)};
    line-height: 0;
    padding: 0 ${getPaddingBySize(DT, size)};
  `;
};

const transitionProperty = 'all';

const styleTypeMixin = (props: SButtonPropsFinal) => {
  const {
    theme: { designTokens: DT },
    styleType,
    checkAble,
    disabled,
    size
  } = props;

  const styleTypeTheme = {
    primary: {
      color: DT.T_BUTTON_PRIMARY_COLOR_TEXT_DEFAULT,
      fill: DT.T_BUTTON_PRIMARY_COLOR_TEXT_DEFAULT,
      border: 'none',
      background: DT.T_BUTTON_PRIMARY_COLOR_BG_DEFAULT,
      boxShadow: DT.T_SHADOW_BUTTON_PRIMARY,
      transition: `${transitionProperty} ${transitionFlat}`,
      ':link,:visited': {
        color: DT.T_BUTTON_PRIMARY_COLOR_TEXT_DEFAULT
      },
      ':hover,:active': {
        background: DT.T_BUTTON_PRIMARY_COLOR_BG_HOVER,
        boxShadow: DT.T_SHADOW_BUTTON_PRIMARY_HOVER
      }
    },
    border: {
      color: DT.T_COLOR_TEXT_DEFAULT_DARK,
      fill: DT.T_COLOR_TEXT_DEFAULT_DARK,
      background: DT.T_BUTTON_SECONDARY_COLOR_BG_DEFAULT,
      border: `1px solid ${DT.T_COLOR_LINE_DEFAULT_DARK}`,
      boxShadow: DT.T_SHADOW_BUTTON_DEFAULT,
      transition: `${transitionProperty} ${transitionFlat}`,
      ':link,:visited': {
        color: DT.T_COLOR_TEXT_DEFAULT_DARK
      },
      ':hover,:active': {
        color: DT.T_COLOR_TEXT_PRIMARY_DEFAULT,
        fill: DT.T_COLOR_TEXT_PRIMARY_DEFAULT,
        border: `1px solid ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT}`,
        background: DT.T_BUTTON_SECONDARY_COLOR_BG_DEFAULT,
        boxShadow: DT.T_SHADOW_BUTTON_HOVER
      }
    },
    'border-gray': {
      color: DT.T_COLOR_TEXT_DEFAULT_LIGHT,
      fill: DT.T_COLOR_TEXT_DEFAULT_LIGHT,
      borderColor: DT.T_COLOR_LINE_DEFAULT_LIGHT,
      background: DT.T_COLOR_BG_DEFAULT_LIGHT,
      transition: `${transitionProperty} ${transitionFlat}`,
      ':link,:visited': {
        color: DT.T_COLOR_TEXT_DEFAULT_LIGHT
      },
      ':active': {
        color: DT.T_COLOR_TEXT_DEFAULT_BRIGHT,
        fill: DT.T_COLOR_TEXT_DEFAULT_BRIGHT,
        borderColor: DT.T_COLOR_LINE_PRIMARY_HOVER,
        background: checkAble ? DT.T_COLOR_BG_DEFAULT_LIGHT : DT.T_BUTTON_SECONDARY_COLOR_BG_DEFAULT
      },
      ':hover': {
        color: DT.T_COLOR_TEXT_PRIMARY_DEFAULT,
        fill: DT.T_COLOR_TEXT_PRIMARY_DEFAULT,
        borderColor: DT.T_COLOR_LINE_PRIMARY_HOVER,
        background: checkAble ? DT.T_COLOR_BG_DEFAULT_LIGHT : DT.T_BUTTON_SECONDARY_COLOR_BG_DEFAULT
      }
    }
  };
  const disabledTheme = {
    background: DT.T_COLOR_BG_DISABLED_LIGHT,
    color: DT.T_COLOR_TEXT_DISABLED,
    fill: DT.T_COLOR_TEXT_DISABLED,
    cursor: 'default',
    borderColor: DT.T_COLOR_LINE_DISABLED_LIGHT,
    boxShadow: 'none',
    transition: `${transitionProperty} ${transitionFlat}`
  };
  return css`
    ${disabled ? disabledTheme : styleTypeTheme[styleType]};
    ${(disabled || styleType === 'border' || styleType === 'border-gray') &&
    css`
      border-width: ${DT.T_LINE_WIDTH_BASE};
      border-style: solid;
      padding: 0 ${offsetPaddingBySize(DT, size, -1)};
      /* line-height: ${offsetHeightBySize(DT, size, -2)}; */
    `};
  `;
};

const shapeMixin = (props: SButtonPropsFinal) => {
  const {
    size,
    shape,
    theme: { designTokens: DT }
  } = props;
  switch (shape) {
    case 'circle':
      return css`
        border-radius: 50% !important;
        padding: 0;
        overflow: hidden;
        width: ${getHeightBySize(DT, size)};
      `;
    case 'square':
      return css`
        padding: 0;
        overflow: hidden;
        width: ${getHeightBySize(DT, size)};
      `;
    default:
      return css``;
  }
};

const loadingMixin = (props: SButtonPropsFinal) => {
  const {
    theme: { designTokens: DT },
    styleType
  } = props;

  return css`
    position: relative;
    pointer-events: none;

    &:before {
      position: absolute;
      top: -1px;
      left: -1px;
      bottom: -1px;
      right: -1px;
      background: ${DT.T_BUTTON_COMMON_COLOR_MASK};
      opacity: 0.6;
      content: '';
      border-radius: inherit;
      z-index: 1;
      transition: opacity 0.2s;
      ${styleType === 'primary' &&
      css`
        top: 0px;
        left: 0px;
        bottom: 0px;
        right: 0px;
      `}
    }
  `;
};

const checkedMixin = (props: SButtonPropsFinal) => {
  const {
    theme: { designTokens: DT }
  } = props;

  return css`
    color: ${DT.T_COLOR_TEXT_DEFAULT_BRIGHT};
    fill: ${DT.T_COLOR_TEXT_DEFAULT_BRIGHT};
    background: ${DT.T_BUTTON_PRIMARY_COLOR_BG_DEFAULT};
    border-color: ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};
    box-shadow: ${DT.T_SHADOW_BUTTON_HOVER};
    :hover {
      background: ${DT.T_BUTTON_PRIMARY_COLOR_BG_DEFAULT};
      color: ${DT.T_COLOR_TEXT_DEFAULT_BRIGHT};
    }
  `;
};

const classNameMixin = ({ size, styleType, shape, loading, disabled, fakeDisabled, checked }: SButtonProps) =>
  classnames(
    prefixCls,
    `${prefixCls}-size-${size}`,
    `${prefixCls}-styletype-${styleType}`,
    shape && `${prefixCls}-${shape}`,
    loading && `${prefixCls}-loading`,
    disabled && `${prefixCls}-disabled`,
    fakeDisabled && `${prefixCls}-disabled-fake`,
    checked && `${prefixCls}-checked`
  );

const buttonStyleMixin = <T extends SButtonProps & { theme: Theme }>(props: T) => {
  const { theme, loading, shape, checked, block, size } = props;
  const { designTokens: DT } = theme;
  const fontSize = {
    sm: DT.T_TYPO_FONT_SIZE_1,
    md: DT.T_TYPO_FONT_SIZE_1,
    lg: DT.T_TYPO_FONT_SIZE_2
  }[size];
  return css`
    margin: 0;
    box-sizing: border-box;
    border-radius: ${DT.T_CORNER_SM};
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    outline: none;
    font-size: ${fontSize};
    white-space: nowrap;
    ${inlineBlockWithVerticalMixin};

    ${sizeMixin(props)};
    ${styleTypeMixin(props)};
    ${shape && shapeMixin(props)};
    ${loading && loadingMixin(props)};
    ${checked && checkedMixin(props)};
    ${block &&
    css`
      width: 100%;
    `};
  `;
};

/* eslint-disable @typescript-eslint/no-unused-vars */
const Button = ({
  loading,
  styleType,
  disabled,
  fakeDisabled,
  onClick,
  checkAble,
  block,
  ...rest
}: SButtonPropsWithTag) => (
  <button disabled={disabled && !fakeDisabled} onClick={!disabled ? onClick : undefined} {...rest} />
);
/* eslint-enable @typescript-eslint/no-unused-vars */
export const SButton = sWrap<SButtonProps, HTMLButtonElement>({
  className: classNameMixin
})(styled(Button)(buttonStyleMixin));

export const SButtonA = sWrap<SButtonProps, HTMLAnchorElement>(
  {
    className: classNameMixin
  },
  {
    ignoreProps: ['disabled', 'fakeDisabled', 'checked', 'checkAble', 'loading']
  }
)(
  styled('a')(props => {
    return css`
      ${buttonStyleMixin(props)};
    `;
  })
);
