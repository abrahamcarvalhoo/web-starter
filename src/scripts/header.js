// --- Header Scroll Class ---

const html = document.querySelector('html')
const header = document.querySelector('#header')

if (header) {
  document.addEventListener('scroll', function() {
    if (html.scrollTop > 50) {
      header.classList.add('header-scrolled')
    } else {
      header.classList.remove('header-scrolled')
    }
  })
}
