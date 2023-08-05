// const nextPage = document.querySelector('#next')

// nextPage.addEventListener('click', (e) =>{
//     console.log(e.target.getAttribute('id'));
//     // window.location.href="home.html"
// })

app.post('/select-category', (req, res) => {
    let categoryForm = req.query.name

    let categoryContainer: Array<string | number> = []
})
