export const lockScroll = (fixedTop = false) => {
  if (fixedTop) {
    document.body.style.top = `0`
  } else {
    document.body.style.top = `-${window.scrollY}px`
  }
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