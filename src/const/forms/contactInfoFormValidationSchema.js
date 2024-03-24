const validationSchema = {
  firstName(value) {
    if (value?.length >= 2) return true

    return 'Imię musi posiadać przynajmniej 2 litery.'
  },
  lastName(value) {
    if (!value) return true // Not required
    if (value.length >= 2) return true

    return 'Nazwisko musi posiadać przynajmniej 2 litery.'
  },
  phoneNumber(value) {
    if (value?.length === 9 && /[0-9-]+/.test(value)) return true

    return 'Numer telefonu może składać się tylko z 9 cyfr.'
  },
  email(value) {
    if (!value) return true // Not required
    if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

    return 'Podano nieprawidłowy adres email.'
  }
}

export default validationSchema
