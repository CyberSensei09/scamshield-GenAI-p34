export interface ExampleMessage {
  id: string
  title: string
  expected: 'legitimate' | 'suspicious'
  text: string
}

export const EXAMPLE_MESSAGES: ExampleMessage[] = [
  {
    id: 'library',
    title: 'Friendly check-in',
    expected: 'legitimate',
    text: 'Hi, are we still meeting at the library tomorrow?',
  },
  {
    id: 'otp',
    title: 'Account block threat',
    expected: 'suspicious',
    text: 'URGENT! Your account will be blocked. Send your OTP immediately.',
  },
  {
    id: 'prize',
    title: 'Prize with a fee',
    expected: 'suspicious',
    text: 'Congratulations! You won a prize. Pay a processing fee to claim your reward.',
  },
  {
    id: 'parcel',
    title: 'Parcel on hold link',
    expected: 'suspicious',
    text: 'Your parcel is on hold. Verify your details at http://example.com.',
  },
]
