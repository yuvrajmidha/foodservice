export default function fetchAll() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      return fetch("http://localhost:4000/foodservice/cms/all_leads", requestOptions)
        .then(response => response.json()).then(res => res.data.data)
}
