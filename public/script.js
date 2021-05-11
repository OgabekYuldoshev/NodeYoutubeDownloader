    let convertBtn = document.querySelector('#convert');
    let show = document.querySelector('#show');
    let URLinput = document.querySelector('#URL-input');
    let VideoName = ''

    function getVideoInfo() {
        fetch(`/get_info?URL=${URLinput.value}`, {
            method:'GET'
        }).then(res => res.json())
        .then(json => {
            document.getElementById('show').className = 'block mt-10'
            const src = document.createAttribute('src')
            src.value = json.img
            document.getElementById('img').setAttributeNode(src)
            document.getElementById('text').innerText = json.name
            VideoName = json.name
        });
    }

    function DownloadVideo(){
        window.open(`/download_video?URL=${URLinput.value}&name=${VideoName}`)
    }

    function DownloadAudio(){
        window.open(`/download_audio?URL=${URLinput.value}&name=${VideoName}`)
    }