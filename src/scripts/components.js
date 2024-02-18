const elementsToLoad = [
    {
        'url':'../../html-components/nav.html',
        'targetNode':'nav'
    },
    {
        'url':'../../html-components/footer.html',
        'targetNode':'footer'
    }
]

for(const el of elementsToLoad){
    // Load navigation content into the designated element
    loadContent(el.url, function (elementData) {
        replaceOldElement(elementData, el.targetNode);
    });
}

// Function to load content from a file using fetch API
function loadContent(url, callback) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            callback(data);
        })
        .catch(error => {
            console.trace('There was a problem fetching the content: ', error);
        });
}

// Function to insert loaded content into a specified element
function replaceOldElement(newDocumentData, querySelector) {
    const old = document.querySelectorAll(querySelector)
    const fragment = document.createRange().createContextualFragment(newDocumentData);

    for(i = 0; i < fragment.children.length; i++){
        const serializer = new XMLSerializer();
        const fragmentString = serializer.serializeToString(fragment.children[i]);
        old[i].outerHTML = fragmentString
    }   
}

