const file = document.getElementById("file-pic")
const img = document.getElementById("img")
const url = document.getElementById("url")
const thumbnail_url = document.getElementById("thumbnail_url")

file.addEventListener("change", ev => {
  const formdata = new FormData()
  formdata.append("image", ev.target.files[0])
  fetch("https://api.imgur.com/3/image/", {
    method: "post",
    headers: {
      Authorization: "Client-ID 5860b306688e64c"
    }
    , body: formdata
  }).then(data => data.json()).then(data => {
    img.src = data.data.link
    // imgur url of photo
    url.innerText = data.data.link
    // get thumbnail url by adding a 't' just before the file extension
    thumbnail_url.innerText = "The thumbnail url is " + data.data.link.replace(/\.[^/.]+$/, "") + "t." + data.data.link.split('.').pop()
  })
})
