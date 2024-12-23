/* eslint-disable react/display-name */
import React, {
  FocusEvent,
  MouseEvent,
  ChangeEvent,
  InputHTMLAttributes,
  ReactNode,
  Ref,
  useCallback,
  useMemo,
  useRef,
  useState,
  useImperativeHandle,
  useContext,
  forwardRef
} from 'react';
import classnames from 'classnames';

import Icon from 'src/components/Icon';
import SvgIcon from 'src/components/SvgIcon';
import ControllerContext from 'src/components/Form/ControllerContext';
import deprecatedLog from 'src/utils/deprecatedLog';
import once from 'src/utils/once';
import noop from 'src/utils/noop';
import useUncontrolled from 'src/hooks/useUncontrolled';
import { Size } from 'src/type';

import { SWrap, inputWrapCls, blockCls, inputPrefixCls, inputSuffixCls, clearCls } from './style';

const deprecatedLogForIcon = once(() => deprecatedLog('Input icon', 'suffix'));

export interface DefinedInputProps {
  /**
   * @deprecated 使用 suffix 替换
   * 图标，传入 string 时为图标类型，也可直接传入图标组件
   */
  icon?: string | ReactNode;
  /** 前缀 */
  prefix?: ReactNode;
  /** 后缀 */
  suffix?: ReactNode;
  /** 是否可清空 */
  clearable?: boolean;
  /** 尺寸 */
  size?: Size;
  /** 状态 */
  status?: 'default' | 'error' | string;
  /** 展示变更为块占位 */
  block?: boolean;
  /** 点击 clear 按钮回调 */
  onClear?: () => void;
  /** 自定义样式 */
  customStyle?: {
    border?: string;
    boxShadow?: string;
    background?: string;
  };
  /** @ignore */
  onFocus?: InputHTMLAttributes<HTMLInputElement>['onFocus'];
  /** @ignore */
  onBlur?: InputHTMLAttributes<HTMLInputElement>['onBlur'];
  /** 是否使用带阴影的输入框 */
  isShadowInput?: boolean;
}

export type InputRef = {
  /** input 焦点 */
  focus: (options?: FocusOptions) => void;
  /** input 元素 */
  input?: HTMLInputElement | null;
};

export type InputProps = DefinedInputProps & Omit<InputHTMLAttributes<HTMLInputElement>, keyof DefinedInputProps>;

const Input = forwardRef(
  (
    {
      value: _value,
      defaultValue,
      onChange: _onChange,
      disabled,
      size = 'lg',
      icon,
      prefix,
      suffix,
      clearable = true,
      block,
      style,
      status: _status,
      customStyle,
      className,
      onFocus = noop,
      onBlur = noop,
      onClear = noop,
      isShadowInput,
      ...rest
    }: InputProps,
    ref: Ref<InputRef>
  ) => {
    const valueGetter = useCallback((e: ChangeEvent<HTMLInputElement>) => e.target.value, []);
    const [value, onChange] = useUncontrolled(_value, defaultValue || '', _onChange, { setter: valueGetter });
    const [focused, setFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const focus = useCallback((options?: FocusOptions) => {
      inputRef.current && inputRef.current.focus(options);
    }, []);
    useImperativeHandle(
      ref,
      () => {
        return {
          input: inputRef.current,
          focus
        };
      },
      [focus]
    );
    const handleFocus = useCallback(
      (e: FocusEvent<HTMLInputElement>) => {
        setFocused(true);
        onFocus(e);
      },
      [onFocus]
    );
    const handleBlur = useCallback(
      (e: FocusEvent<HTMLInputElement>) => {
        setFocused(false);
        onBlur(e);
      },
      [onBlur]
    );
    const onMouseDown = useCallback(
      (e: MouseEvent) => {
        e.preventDefault();
        focus();
      },
      [focus]
    );
    const handleClear = useCallback(
      e => {
        if (disabled) return;
        onClear();
        const input = inputRef.current;
        if (!input) return;
        e.target = input;
        e.currentTarget = input;
        const cacheV = input.value;
        input.value = '';
        onChange(e);
        input.value = cacheV;
      },
      [disabled, onChange, onClear]
    );
    const renderClear = useMemo(() => {
      if (clearable) {
        return (
          <span className={clearCls} onClick={handleClear} onMouseDown={onMouseDown}>
            <SvgIcon type="cross-circle-filled" />
          </span>
        );
      }
    }, [clearable, handleClear, onMouseDown]);
    const renderPrefix = useMemo(() => {
      return (
        prefix && (
          <span className={inputPrefixCls} onMouseDown={onMouseDown}>
            {prefix}
          </span>
        )
      );
    }, [onMouseDown, prefix]);
    const renderSuffix = useMemo(() => {
      if (icon) {
        deprecatedLogForIcon();
      }
      let renderSuffix = null;
      if (suffix) {
        renderSuffix = suffix;
      } else if (typeof icon === 'string') {
        renderSuffix = <Icon type={icon} />;
      } else if (React.isValidElement(icon)) {
        renderSuffix = icon;
      }
      if (renderSuffix) {
        return (
          <span className={inputSuffixCls} onMouseDown={onMouseDown}>
            {renderSuffix}
          </span>
        );
      }
    }, [icon, onMouseDown, suffix]);

    const { status } = useContext(ControllerContext);

    return (
      <SWrap
        className={classnames(block && blockCls, className)}
        {...{ size, focused, style, disabled, status: _status || status, customStyle, isShadowInput }}
        empty={!value}
      >
        <span className={inputWrapCls}>
          {renderPrefix}
          <input
            {...rest}
            value={value}
            onChange={onChange}
            ref={inputRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
          />
          {renderClear}
          {renderSuffix}
        </span>
      </SWrap>
    );
  }
);

export default React.memo(Input);
