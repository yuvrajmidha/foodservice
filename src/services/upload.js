export default function uploadImage(image) {

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    name:  "foodservice_"  + Date.now(),
    type: "image/jpeg",
    content: image,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch("https://hellopos.net.au/foodservice/util/create_lead/s3/upload", requestOptions)
    .then((response) => response.text())

}
