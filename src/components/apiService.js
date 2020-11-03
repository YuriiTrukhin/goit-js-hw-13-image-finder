export default function (value,page) {
    let TOKEN = "18953391-242970f94fd4bfb72dd77b6d1";      
    
        return fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${value}&page=${page}&per_page=12&key=${TOKEN}`)
            .then(data => data.json())  
}