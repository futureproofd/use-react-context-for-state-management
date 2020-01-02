import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import {EmailContext} from '../EmailContext'
import MessageViewer from '../MessageViewer'
//we import the entire context object

const email = {
  subject: 'Test email',
  body: 'testing body',
}

test('view an email', () => {
  const {container} = render(
    <EmailContext.Provider value={{currentEmail: email}}>
      <MessageViewer />
    </EmailContext.Provider>,
  )

  expect(container.querySelector('h2').textContent).toEqual(email.subject)
  expect(container.querySelector('h2 + div').textContent).toEqual(email.body)
})

test('back button', () => {
  const mockCallback = jest.fn()
  const {container} = render(
    <EmailContext.Provider
      value={{currentEmail: email, onSelectEmail: mockCallback}}
    >
      <MessageViewer />
    </EmailContext.Provider>,
  )

  fireEvent.click(container.querySelector('button'))
  expect(mockCallback).toBeCalledWith(null)
})
