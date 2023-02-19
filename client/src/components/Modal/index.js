import React, { useEffect, useMemo, useCallback } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import { CloseOutlined } from '@ant-design/icons';
import { CSSTransition } from 'react-transition-group';
import { createNamespace } from '../../util';
import './index.scss';

const isFunc = (func) => typeof func === 'function';

const [prefixCls, bem] = createNamespace('modal');

/**
 * modal pop-up
 * @param props
 * @returns
 */
function Modal(props) {
  const {
    mask = true,
    afterClose,
    visible = false,
    onMaskClick,
    onCancel,
    onConfirm,
    children,
    cancelText = 'Cancel',
    confirmText = 'Ok',
    footer = false,
    title,
    className,
    style,
  } = props;

  useEffect(() => {
    if (!visible) {
      if (afterClose && isFunc(afterClose)) {
        afterClose();
      }
    }
  }, [visible, afterClose]);

  const wrapCls = useMemo(() => {
    return classnames(prefixCls, className);
  }, [className]);

  const handleClickMask = useCallback((e) => {
    if (onMaskClick && isFunc(onMaskClick)) {
      onMaskClick(e);
    }
  }, [onMaskClick]);

  const handleCancel = useCallback(
    (e) => {
      if (onCancel && isFunc(onCancel)) {
        onCancel(e);
      }
    }, [onCancel]);

  const handleConfirm = useCallback((e) => {
    if (onConfirm && isFunc(onConfirm)) {
      onConfirm(e);
    }
  }, [onConfirm]);

  const renderButton = useCallback(() => {
    let cancelData = {};
    let confirmData = {};
    if (typeof cancelText === 'string') {
      cancelData['text'] = cancelText;
    } else {
      cancelData = cancelText;
    }
    if (typeof confirmText === 'string') {
      confirmData['text'] = confirmText;
    } else {
      confirmData = confirmText;
    }
    return (
      <div className={bem('footer')}>
        {cancelData.text ? (
          <div
            className={bem('button', {
              cancel: true,
              disabled: cancelData.disabled,
            })}
            onClick={handleCancel}>
            {cancelData.text}
          </div>
        ) : null}
        <div
          className={bem('button', {
            confirm: true,
            disabled: confirmData.disabled,
          })}
          onClick={handleConfirm}>
          {confirmData.text}
        </div>
      </div>
    );
  }, [cancelText, confirmText, handleCancel, handleConfirm]);

  return ReactDOM.createPortal(
    <CSSTransition in={visible} timeout={300} classNames={bem('transition')} unmountOnExit>
      <div className={wrapCls} style={{ ...style }}>
        {mask ? <div className={bem('mask')} onClick={handleClickMask}></div> : null}
        <div className={bem('wrap')}>
          <div className={bem('main')}>
            {title ? <div className={bem('title')}>
              <div className={bem('title-text')}>{title}</div>
              <div className={bem('title-icon')} onClick={handleCancel}><CloseOutlined /></div>
            </div> : null}
            {children ? (
              <div className={bem('content', { hasTitle: title })}>{children}</div>
            ) : null}
          </div>
          {footer ? <div className={bem('footer')}>{footer}</div> : renderButton()}
        </div>
      </div>
    </CSSTransition>,
    document.body,
  );

}

export default Modal;
