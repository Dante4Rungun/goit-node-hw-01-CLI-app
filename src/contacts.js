import { promises as fs } from 'fs';

const contactsPath = './db/contacts.json'

const getMaxId = (data) => {
  const idList = data.map(contact => contact.id)
  return Math.max(...idList) + 1
}

export function listContacts() {
  fs.readFile(contactsPath)
    .then(data => console.log(JSON.parse(data)))
    .catch(err => console.log(err.message))
}

export function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then(data => console.log(JSON.parse(data).filter(contact => contact.id === contactId.toString())))
    .catch(err => console.log(err.message))
}

export async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath)
    await fs.writeFile(contactsPath, JSON.stringify(JSON.parse(data).filter(contact => contact.id !== contactId.toString())))
      .then(console.log('Success deleted'))
      .catch(err => console.log(err.message))     
  }
  catch (err) {
    console.log(err)
  }
}

export async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath)
    const parsedData = JSON.parse(data)
    const id = getMaxId(parsedData).toString()
    parsedData.push({id: id, name: name, email: email, phone: phone})
    await fs.writeFile(contactsPath, JSON.stringify(parsedData))
    .then(console.log('Success added'))
    .catch(err => console.log(err.message))
  }
  catch (err) {
    console.log(err)
  }
} 