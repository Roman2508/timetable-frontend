import { LoadingStatusTypes } from "../appTypes"

export type GroupsInitialState = {
  groupCategories: GroupCategoriesType[] | null
  loadingStatus: LoadingStatusTypes
}

export type GroupCategoriesType = {
  id: number
  name: string
  grous: GroupsShortType[]
}

export type GroupsType = {
  id: number
  name: string
  students: number
  courseNumber: number
  yearOfAdmission: number
  specializationList: string[]
  formOfEducation: "Денна" | "Заочна"
  stream: { id: number; name: string }
  category: { id: number; name: string }
  groupLoad: { id: number; name: string }
  educationPlan: { id: number; name: string }
}

export type GroupsShortType = Pick<GroupsType, "id" | "name">

// Pick || Omit
