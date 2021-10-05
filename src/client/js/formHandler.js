async function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('textbox').value

    if (Client.isValidURL(formText)) {
        //URL validation 

        fetch('http://localhost:8081/getAnalysis', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ formText: formText }),
        })
            .then(res => res.json())
            .then(function (res) {
                updateUI(res)
            }).catch((error) => {
                console.log("error", error)
            })
    } else {
        alert('Invalid URL')
    };

}

function updateUI(res) {
    document.getElementById('subjectivity').innerHTML = 'Subjectivity is: ' + res.subjectivity
    document.getElementById('agreement').innerHTML = 'Agreement is: ' + res.agreement
    document.getElementById('irony').innerHTML = 'Irony is: ' + res.irony
    document.getElementById('confidence').innerHTML = 'Confidence (1-100%) is: ' + res.confidence
}

document.getElementById('submit').addEventListener('click', handleSubmit)

export { handleSubmit }