import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

import './WelcomeDialog.scss'

import captcha from '../images/pharmaceutical-captcha.jpg'

export const WelcomeDialog = () => {
  const [hasSeenWelcome, setHasSeenWelcome] = useState(localStorage.getItem('has-seen-welcome'))
  const handleDismissWelcome = () => {
    localStorage.setItem('has-seen-welcome', 'true')
    setHasSeenWelcome('true')
  }

  if (hasSeenWelcome) {
    return null
  }

  return (
    <Dialog.Root open>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" onClick={handleDismissWelcome} />
        <Dialog.Content
          className="dialog-content welcome-dialog-content"
          onClick={handleDismissWelcome}
        >
          <div className="dialog-header">
            <Dialog.Title>Prove Your Humanity</Dialog.Title>
          </div>
          <div className="dialog-body">
            <img
              src={captcha}
              alt="A fake captcha challenge that reads 'Select all pharmaceutical companies which have NOT settled for over 500 million US dollars for off-label promotion and/or kickbacks. If there are none, click skip. Below is a grid of nine major drug company logos. Below them is a fake skip button.' "
              className="dialog-iframe"
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
