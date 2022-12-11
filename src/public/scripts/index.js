const form = document.querySelector('form');
const originalUrl = document.querySelector('.originalUrl');
const shorten = document.querySelector('.shorten');
const urlCard = document.querySelectorAll('.url-card');

form.addEventListener('submit', async (e) => {
  if(originalUrl.value === '' && shorten.value === ''){
    e.preventDefault();
    return;
  } else {
    createUrl();
  }
});

async function createUrl(){
  const payload = {
    originalUrl: originalUrl.value,
    shorten: shorten.value
  }
  const res = await fetch('/create', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

urlCard.forEach(card => {
  const url = card.querySelector('.url-link')['href']
  const copyUrl = card.querySelector('.copy')
  copyUrl.addEventListener('click', async () => {
    await navigator.clipboard.writeText(url);
    copyUrl.style.color = 'green'
    setTimeout(()=>{
      copyUrl.style.color = 'white'
    },1000)
  })
})