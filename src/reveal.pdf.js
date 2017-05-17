//

if (window.location.search !== "") {
    let searchParams = Object.assign({}, ...(window.location.search.match(/[^&|?]+=[^&]+/g).map(el => {
        let s = el.split("=")
        return {
            [s[0]]: s[1]
        }
    })))
    let pdfPath = searchParams.pdfPath
    PDFJS.workerSrc = './lib/pdf/pdf.worker.min.js';
    let defaultWidth=960
    let defaultHeight=660
    let defaultAspect = defaultWidth / defaultHeight
    let loadingTask = PDFJS.getDocument(pdfPath);
    loadingTask.promise.then((pdfDocument) => {
        // Request a first page
        let {numPages} = pdfDocument
        let root = document.querySelector(".slides")
        let pArray = []
        for (let i = 0; i < numPages; i++) {
            root.appendChild(document.createElement('section'))
            pArray.push(new Promise((res, rej) => {
                let nowIndex = i + 1
                pdfDocument.getPage(nowIndex).then((pdfPage) => {
                    let viewport = pdfPage.getViewport(1.5)
                    let canvas = document.createElement("canvas")
                    canvas.style.boxShadow = "7px 7px 25px 0 rgba(0,0,0,1)"
                    document.querySelector(`section:nth-child(${nowIndex})`).appendChild(canvas)
                    let {width,height}=viewport
                    canvas.width = width
                    canvas.height = height
                    if(width/height>defaultAspect){
                        canvas.style.width=defaultWidth+"px"
                    }
                    else {
                        canvas.style.height=defaultHeight+"px"
                    }
                    let ctx = canvas.getContext('2d')
                    let renderTask = pdfPage.render({canvasContext: ctx, viewport: viewport})
                    return renderTask.promise
                }).then(r => {
                    res()
                })
            }))
        }
        Promise.all(pArray).then(final => {
            console.log("Finish")
		if(window.location.search.match(/\/pdf\/6/)){
			let c=document.querySelectorAll("canvas")[8]
			c.parentNode.removeChild(c)
			let s=document.querySelectorAll("section")[8]
			let v=document.createElement("video")
            let so=document.createElement("source")
			so.src="/pdf/6.mp4"
			v.controls=true
            v.appendChild(so)
			s.appendChild(v)


			
		}
            Reveal.initialize()
        })
    }).catch(function(reason) {
        console.error('Error: ' + reason)
    })
}
