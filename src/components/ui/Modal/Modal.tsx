import React from 'react'
import styles from './Modal.module.scss'
import cn from 'classnames'

import { MdClose } from 'react-icons/md'
import { ThemeContext } from '../../../App'

interface IModalProps {
  isShow: boolean
  modalTitle?: string
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>
  children: JSX.Element | JSX.Element[] | string
  ref: any
  classNames?: string
  [propName: string]: any
}

const Modal = React.forwardRef<HTMLDivElement, React.PropsWithChildren<IModalProps>>(
  ({ children, isShow, setIsShow, modalTitle, classNames = '', ...props }, ref) => {
    const { colorMode } = React.useContext(ThemeContext)

    // disable scroll on open modal
    React.useEffect(() => {
      if (isShow) {
        document.body.style.height = '100vh'
        document.body.style.overflow = 'hidden'

        return () => {
          document.body.style.overflow = 'unset'
          document.body.style.height = ''
        }
      }
    }, [isShow])

    return (
      <>
        {/* {isShow && ( */}
        <div className={cn(styles.layout, { [styles.layoutClose]: !isShow })}>
          <div className={styles.modalWrapper}>
            <div
              className={cn(styles.modal, {
                [styles.dark]: colorMode === 'dark',
                [styles.light]: colorMode === 'light',
                [styles.openModal]: isShow,
                [styles.closeModal]: !isShow,
              })}
              //@ts-ignore
              ref={ref}
            >
              <div className={styles.modalTop}>
                <h5
                  style={{
                    whiteSpace: 'nowrap',
                    maxWidth: '90%',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                  }}
                >
                  {modalTitle}
                </h5>
                <MdClose className={styles.closeIcon} onClick={() => setIsShow(false)} size={30} />
              </div>
              <div className={classNames}>{children}</div>
            </div>
          </div>
        </div>
        {/* )} */}
      </>
    )
  }
)

export default Modal
