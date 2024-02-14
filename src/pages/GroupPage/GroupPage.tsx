import React from 'react'
import cn from 'classnames'
import { useSelector } from 'react-redux'

import { ThemeContext } from '../../App'
import styles from './GroupPage.module.scss'
import { useOutside } from '../../hooks/useOutside'
import Title from '../../components/ui/Title/Title'
import Paper from '../../components/ui/Paper/Paper'
import Input from '../../components/ui/Input/Input'
import Button from '../../components/ui/Button/Button'
import Select from '../../components/ui/Select/Select'
import { groupsSelector } from '../../redux/groups/groupsSlice'
import { SelectPlanModal } from '../../components/GroupPage/SelectPlanModal'
import { useAppDispatch } from '../../redux/store'
import { useParams } from 'react-router-dom'
import { getGroup } from '../../redux/groups/groupsAsyncActions'
import { useForm } from 'react-hook-form'

const GroupPage = () => {
  const dispatch = useAppDispatch()

  const params = useParams()

  const { colorMode } = React.useContext(ThemeContext)

  const { group } = useSelector(groupsSelector)

  const [t, setT] = React.useState(null)

  const {} = useForm({ mode: 'onBlur' })

  const { ref: planModalRef, isShow: isPlanModalShow, setIsShow: setIsPlanModalShow } = useOutside(false)

  React.useEffect(() => {
    if (params.id) {
      dispatch(getGroup(params.id))
    }
  }, [])

  return (
    <>
      <SelectPlanModal ref={planModalRef} isShow={isPlanModalShow} setIsShow={setIsPlanModalShow} />

      <div className={styles.container}>
        <Paper classNames={styles.wrapper}>
          <div
            className={cn(styles.top, {
              [styles.light]: colorMode === 'light',
              [styles.dark]: colorMode === 'dark',
            })}
          >
            <Title Variant="h6" align="left">
              {group.name ? group.name : 'Нова група'}
            </Title>
          </div>

          <div className={styles.controls}>
            <div className={styles['left-col']}>
              <Input
                setValue={() => {}}
                labelBackColor="dark"
                width="100%"
                wrapperSx={{ marginBottom: '20px' }}
                label="Шифр групи"
              />
              <Input
                setValue={() => {}}
                labelBackColor="dark"
                width="100%"
                wrapperSx={{ marginBottom: '20px' }}
                label="Рік вступу"
                htmlType="number"
              />
              <Input
                setValue={() => {}}
                labelBackColor="dark"
                width="100%"
                wrapperSx={{ marginBottom: '20px' }}
                label="Курс"
                htmlType="number"
              />
              <Input
                setValue={() => {}}
                labelBackColor="dark"
                width="100%"
                wrapperSx={{ marginBottom: '20px' }}
                label="Кількість студентів"
                htmlType="number"
              />
              <Select
                label="Форма навчання"
                labelBgColor="dark"
                options={[
                  { value: 'full-time', label: 'Денна' },
                  { value: 'part-time', label: 'Заочна' },
                ]}
                selectValue={t}
                onChange={(e: any) => setT(e)}
              />
              {/* <Input
              setValue={() => {}}
              labelBackColor="dark"
              width="100%"
              wrapperSx={{ marginBottom: "20px" }}
              label="Форма навчання"
            /> */}
            </div>
            <div className={styles['right-col']}>
              <div
                className={cn(styles['info-button'], {
                  [styles.light]: colorMode === 'light',
                  [styles.dark]: colorMode === 'dark',
                })}
                onClick={() => setIsPlanModalShow(true)}
              >
                НАВЧАЛЬНИЙ ПЛАН:
              </div>
              <div
                className={cn(styles['info-button'], {
                  [styles.light]: colorMode === 'light',
                  [styles.dark]: colorMode === 'dark',
                })}
              >
                ПОТОКИ
              </div>
              <div
                className={cn(styles['info-button'], {
                  [styles.light]: colorMode === 'light',
                  [styles.dark]: colorMode === 'dark',
                })}
              >
                ПІДГРУПИ
              </div>
              <div
                className={cn(styles['info-button'], {
                  [styles.light]: colorMode === 'light',
                  [styles.dark]: colorMode === 'dark',
                })}
              >
                СПЕЦ. ПІДГРУПИ
              </div>
            </div>
          </div>
        </Paper>

        <div className={styles.actions}>
          <Button sx={{ marginRight: '24px' }} variant="text" color="black">
            Відмінити
          </Button>
          <Button sx={{ marginRight: '2px' }} variant="outlined">
            Зберегти
          </Button>
        </div>
      </div>
    </>
  )
}

export default GroupPage
