const btn = document.querySelector('button')
const inputs = document.querySelector('form')
btn.addEventListener('click', () => {

    const name = (inputs.elements["name"].value).trim()
    const email = (inputs.elements["email"].value).trim()
    const pnumber = (inputs.elements["pnumber"].value).trim()
    const date = (inputs.elements["date"].value).trim()
    const person = (inputs.elements["person"].value).trim()
    const msg = (inputs.elements["message"].value).trim()
   
    if (!name.length > 0 || !email.length > 0 || !pnumber.length > 0 || !date.length > 0 || !person.length > 0 || !msg.length > 0) {
        alert("All fields are mandatory")
        return
    }
    Email.send({
        Host: "smtp.mailtrap.io",
        Username: "c53b9f6c19f76a",
        Password: "5bc969b00a67ae",
        To: "imdhaito@gmail.com",
        From: email,
        Subject: "Reserved table request By the Customer",
        Body: msg + "<br>" + name + "<br>" + email + "<br>" + pnumber + "<br>" + date + "<br>" + person
    }).then(msg => alert("The email successfully sent"))
})