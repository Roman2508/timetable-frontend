type FormOfEducationType = {
  value: "full-time" | "part-time"
  label: "Денна" | "Заочна"
}

export const getFormOfEducation = (formOfEducation: "Денна" | "Заочна"): FormOfEducationType => {
  if (formOfEducation === "Денна") {
    return { label: formOfEducation, value: "full-time" }
  } else {
    return { label: formOfEducation, value: "part-time" }
  }
}
