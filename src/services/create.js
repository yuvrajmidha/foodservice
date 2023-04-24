export default function createNew(image) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "image": image
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    return fetch("https://hellopos.net.au/foodservice/cms/create_lead", requestOptions)
    .then(response => response.json())
  
}
