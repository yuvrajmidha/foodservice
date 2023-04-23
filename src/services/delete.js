export default function deleteOne(id) {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: "",
    redirect: 'follow'
    };

    return fetch("http://localhost:4000/foodservice/cms/delete_lead?_id=" + id, requestOptions)
    .then(response => response.json())
    
}
