export const lockScroll = (top = window.scrollY) => {
  document.body.style.top = `-${top}px`
  document.body.style.left = '0'
  document.body.style.right = '0'
  document.body.style.position = 'fixed'
}

export const unlockScroll = () => {
  const originalScrollPos = document.body.style.top;
  document.body.style.position = ''
  document.body.style.top = ''
  document.body.style.left = ''
  document.body.style.right = ''
  window.scrollTo(0, parseInt(originalScrollPos) * -1)
}