document.getElementById('buscar-input').addEventListener('keyup', function(){
    const searchText = document.getElementById('buscar-input').value.toLowerCase()
    const content = document.querySelector('.content')
    if(!searchText){
        
        removeDestaque(content)
    }else{
        removeDestaque(content)
        adicionaDestaque(content, searchText)
    }
})

function adicionaDestaque(element, searchText){
    if(element){
        if(element.nodeType === 3){
            const elementText = element.textContent.toLowerCase()
            const index = elementText.indexOf(searchText)
            if( index !== -1){
                const textoDestacado = document.createElement('span')
                textoDestacado.className = 'destacado'
                const originalText = element.textContent

                textoDestacado.textContent = originalText.substring(index, index + searchText.length)

                const beforeText = document.createTextNode(originalText.substring(0, index))
                const afterText = document.createTextNode(originalText.substring(index + searchText.length))

                const parent = element.parentNode
                parent.insertBefore(beforeText, element)
                parent.insertBefore(textoDestacado, element)
                parent.insertBefore(afterText, element)
                parent.removeChild(element)
            }
        }   else if(element.nodeType === 1 && element.childNodes && !['SCRIPT', 'STYLE'].includes(element.tagName)){
                element.childNodes.forEach(child => adicionaDestaque(child, searchText));
        }
    }
}

function removeDestaque(element){
    const destaque = element.querySelectorAll('.destacado')
    destaque.forEach(destaque => {
        const parent = destaque.parentNode
        parent.replaceChild(document.createTextNode(destaque.textContent), destaque)
        parent.normalize()
    })
}