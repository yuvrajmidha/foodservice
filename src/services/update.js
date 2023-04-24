export default function updateInfo(id, text) {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "info": text
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    return fetch("https://hellopos.net.au/foodservice/cms/update_lead?_id=" + id, requestOptions)
    .then(response => response.json())
    
}
