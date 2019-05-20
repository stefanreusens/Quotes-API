window.onload = () => {
    fetch('https://becode-quotes-api-exercise.herokuapp.com/quotes', {
            method: "GET"
        })
        .then(response => response.json())
        .then(json => getQuote(json))
        .catch(error => alert('Error:', error));
}



const getQuote = (data) => {

    // GET QUOTE BUTTON

    const button = document.querySelector("#get-quote");

    const handleClickButton = () => {
        const content = document.querySelector(".content");
        const quote = document.querySelector("h2");
        const author = document.querySelector("p");
        let random = Math.floor(Math.random() * data.length);
        content.setAttribute('data', data[random]._id);
        quote.textContent = `"${data[random].quote}"`;
        author.textContent = data[random].author;
    }

    handleClickButton(); //Onload get quote

    const handleDownButton = () => {
        button.style.transform = "scale(1.05)";
    }
    const handleUpButton = () => {
        button.style.transform = "scale(1)";
    }

    button.addEventListener("mousedown", handleDownButton);
    button.addEventListener("mouseup", handleUpButton);
    button.addEventListener("click", handleClickButton);




    // DESTROY BUTTON

    const handleClickDestroy = () => {
        const content = document.querySelector(".content");
        const contentId = content.getAttribute('data');
        console.log(contentId);

        const deleteQuote = {
            method: `delete`,
            mode: `cors`
        }

        console.log("quote deleted");
        fetch(`/quotes/destroy/${contentId}`, deleteQuote);

        // handleClickButton(); //On Destroy get Quote: Problem. Still uses deleted quote 

        window.location.reload(true); //Reload page to get new quote
    }

    const destroyButton = document.querySelector("#destroy-button");
    destroyButton.addEventListener("click", handleClickDestroy);

}


// CREATE QUOTE

const handleClickCreate = (e) => {
    e.preventDefault();
    const createQuote = document.querySelector('#create-quote').value;
    const createAuthor = document.querySelector('#create-author').value;

    if (createQuote == "" && createAuthor == "") {
        window.alert("Please fill in the form");
    } else if (createQuote == "") {
        window.alert("Please fill in the quote");
    } else if (createAuthor == "") {
        window.alert("Please fill in the author");
    } else {
        const addQuote = {
            method: `post`,
            mode: `cors`,
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                "quote": `${createQuote}`,
                "author": `${createAuthor}`
            })
        }

        console.log("quote added");
        fetch('/quotes/create', addQuote)
            .then(location.reload());
    }
}

const createButton = document.querySelector('#create-button');
createButton.addEventListener('click', handleClickCreate);