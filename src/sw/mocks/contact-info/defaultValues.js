import ContactInfo from '@/models/contactInfoModel'

const defaultValues = [
  new ContactInfo({
    id: 1,
    firstName: 'Piotr',
    phoneNumber: '111000111'
  }),
  new ContactInfo({
    id: 2,
    firstName: 'Katarzyna',
    lastName: 'Wielka',
    phoneNumber: '000000000',
    email: 'kasia@skrzynka.pl'
  })
]

export default defaultValues
