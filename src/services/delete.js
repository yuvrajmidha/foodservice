export default function deleteOne(id) {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: "",
    redirect: 'follow'
    };

    return fetch("https://hellopos.net.au/foodservice/cms/delete_lead?_id=" + id, requestOptions)
    .then(response => response.json())
    
}
