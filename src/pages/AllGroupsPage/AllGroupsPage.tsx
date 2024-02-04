import React, { useContext } from "react"
import { useSelector } from "react-redux"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { MdDeleteOutline as DeleteIcon } from "react-icons/md"
import { IoIosAddCircleOutline as AddIcon } from "react-icons/io"
import { MdDriveFileRenameOutline as RenameIcon } from "react-icons/md"

import { ThemeContext } from "../../App"
import styles from "./AllGroupsPage.module.scss"
import Text from "../../components/ui/Text/Text"
import { useAppDispatch } from "../../redux/store"
import Title from "../../components/ui/Title/Title"
import Table from "../../components/ui/Table/Table"
import ListItem from "../../components/ui/List/ListItem"
import TableRow from "../../components/ui/Table/TableRow"
import TableBody from "../../components/ui/Table/TableBody"
import TableHead from "../../components/ui/Table/TableHead"
import Skeleton from "../../components/ui/Skeleton/Skeleton"
import ListWrapper from "../../components/ui/List/ListWrapper"
import { groupsSelector } from "../../redux/groups/groupsSlice"
import EmptyDarkImage from "../../assets/images/empty-dark.png"
import EmptyLightImage from "../../assets/images/empty-light.png"
import IconButton from "../../components/ui/IconButton/IconButton"
import TableHeadCell from "../../components/ui/Table/TableHeadCell"
import TableBodyCell from "../../components/ui/Table/TableBodyCell"
import { GroupCategoriesType } from "../../redux/groups/groupsTypes"
import GroupsPageModal from "../../components/GroupsPage/GroupsPageModal"
import {
  deleteGroup,
  deleteGroupCategory,
  getGroupCategories,
} from "../../redux/groups/groupsAsyncActions"

export type GroupModalTypes = "create-category" | "update-category"

const Groups: React.FC = () => {
  const dispatch = useAppDispatch()

  const { colorMode } = useContext(ThemeContext)

  const { groupCategories, loadingStatus } = useSelector(groupsSelector)

  const [activeGroupCategory, setActiveGroupCategory] = React.useState<null | GroupCategoriesType>(
    null
  )
  const [groupModalTypes, setGroupModalTypes] = React.useState<GroupModalTypes>("create-category")
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const onOpenModal = (modalType: GroupModalTypes) => {
    setGroupModalTypes(modalType)
    setIsModalOpen(true)
  }

  const onDeleteEntity = async (type: "category" | "group", id: number) => {
    if (type === "category") {
      if (window.confirm("Ви дійсно хочете видалити категорію?")) {
        await dispatch(deleteGroupCategory(id))

        if (groupCategories) {
          setActiveGroupCategory(groupCategories[0])
        }
      }
    }

    if (type === "group") {
      if (window.confirm("Ви дійсно хочете видалити групу?")) {
        dispatch(deleteGroup(id))
      }
    }
  }

  React.useEffect(() => {
    if (groupCategories) {
      setActiveGroupCategory(groupCategories[0])
      return
    }

    const fetchData = async () => {
      const { payload } = await dispatch(getGroupCategories())
      setActiveGroupCategory((payload as GroupCategoriesType[])[0])
    }
    fetchData()
  }, [])

  return (
    <>
      <GroupsPageModal
        isShow={isModalOpen}
        setIsShow={setIsModalOpen}
        modalType={groupModalTypes}
        activeGroupCategory={activeGroupCategory}
        setActiveGroupCategory={setActiveGroupCategory}
      />

      <div className={styles.container}>
        <div className={styles["col-left"]}>
          <div className={styles["col-left-controls"]}>
            <Title Variant="h5" classNames={styles["col-left-title"]}>
              Структурні підрозділи
            </Title>

            <IconButton sx={{ marginLeft: "10px" }} onClick={() => onOpenModal("create-category")}>
              <AddIcon size={24} />
            </IconButton>
          </div>

          <ListWrapper sx={{ maxWidth: "100%" }}>
            {groupCategories
              ? groupCategories.map((el) => (
                  <ListItem
                    key={el.name}
                    onClick={() => setActiveGroupCategory(el)}
                    active={el.id === activeGroupCategory?.id}
                  >
                    <div className={styles.subdiv}>
                      <div className={styles["subdiv-name"]}>{el.name}</div>
                      <div className={styles["subdiv-groups-count"]}>
                        Кількість груп: {el.groups.length}
                      </div>
                    </div>
                  </ListItem>
                ))
              : Array(3)
                  .fill(null)
                  .map((_, index) => <Skeleton key={index} width="100%" height="75px" />)}
          </ListWrapper>
        </div>

        <div className={styles["col-right"]}>
          <div className={styles["col-right-controls"]}>
            <Title Variant="h5">Групи</Title>

            <div className={styles["selected-group"]}>
              {activeGroupCategory ? (
                <>
                  <Title
                    Variant="h6"
                    sx={{
                      marginRight: "10px",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      maxWidth: "450px",
                    }}
                  >
                    {activeGroupCategory.name}
                  </Title>

                  <IconButton
                    sx={{ marginRight: "10px" }}
                    onClick={() => onOpenModal("update-category")}
                  >
                    <RenameIcon size={20} />
                  </IconButton>

                  <IconButton
                    sx={{ marginRight: "10px" }}
                    onClick={() => onDeleteEntity("category", activeGroupCategory.id)}
                  >
                    <DeleteIcon size={20} />
                  </IconButton>

                  <Link to="/group/create">
                    <IconButton>
                      <AddIcon size={24} />
                    </IconButton>
                  </Link>
                </>
              ) : (
                <Text>Завантаження...</Text>
              )}
            </div>
          </div>

          <Table>
            <TableHead>
              <TableHeadCell>Назва</TableHeadCell>
              <TableHeadCell>Курс</TableHeadCell>
              <TableHeadCell>Cтудентів</TableHeadCell>
              <TableHeadCell>Дії</TableHeadCell>
            </TableHead>

            <TableBody>
              {activeGroupCategory ? (
                activeGroupCategory.groups.length ? (
                  activeGroupCategory.groups.map((el) => (
                    <TableRow key={el.id}>
                      <TableBodyCell
                        align="left"
                        sx={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}
                      >
                        <NavLink to={`/group/${el.id}`} className={styles.groupName}>
                          {el.name}
                        </NavLink>
                      </TableBodyCell>

                      <TableBodyCell>{String(el.courseNumber)}</TableBodyCell>

                      <TableBodyCell>{String(el.students)}</TableBodyCell>

                      <TableBodyCell>
                        <NavLink to={`/group/${el.id}`} className={styles.groupName}>
                          <IconButton>
                            <RenameIcon size={20} />
                          </IconButton>
                        </NavLink>

                        <IconButton onClick={() => onDeleteEntity("group", el.id)}>
                          <DeleteIcon size={20} />
                        </IconButton>
                      </TableBodyCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableBodyCell colspan="4" sx={{ padding: "20px 0" }}>
                      <div className={styles["empty-wrapper"]}>
                        <img src={colorMode === "light" ? EmptyLightImage : EmptyDarkImage} />
                        <Text>Пусто</Text>
                      </div>
                    </TableBodyCell>
                  </TableRow>
                )
              ) : (
                Array(3)
                  .fill(null)
                  .map((_, index) => (
                    <TableRow key={index}>
                      <TableBodyCell colspan="4" sx={{ padding: 0 }}>
                        <Skeleton width="100%" height="56px" />
                      </TableBodyCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}

export default Groups
