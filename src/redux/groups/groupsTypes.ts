import { LoadingStatusTypes } from '../appTypes'

export type GroupsInitialState = {
  groupCategories: GroupCategoriesType[] | null
  group: GroupsType
  loadingStatus: LoadingStatusTypes
}

export type GroupCategoriesType = {
  id: number
  name: string
  groups: GroupsShortType[]
}

export type GroupsType = {
  id: number
  name: string
  students: number
  courseNumber: number
  yearOfAdmission: number
  specializationList: string[]
  formOfEducation: 'Денна' | 'Заочна'
  stream: { id: number; name: string }[]
  category: { id: number; name: string } | null
  groupLoad: { id: number; name: string } | null
  educationPlan: { id: number; name: string } | null
}

export type GroupsShortType = Pick<GroupsType, 'id' | 'name' | 'courseNumber' | 'students'>

export type GroupFormType = Omit<GroupsType, "id">

// Pick || Omit
