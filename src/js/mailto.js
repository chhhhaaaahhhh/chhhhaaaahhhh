document.addEventListener("DOMContentLoaded", function () {
    const submitButton = document.querySelector(".btn-neutral");
    submitButton.addEventListener("click", function () {
        const name = document.querySelector('input[placeholder="entrez votre nom"]').value;
        const firstname = document.querySelector('input[placeholder="entrez votre prénom"]').value;
        const email = document.querySelector('input[placeholder="entrez votre mail"]').value;
        const message = document.querySelector('.textarea').value;

        const mailtoURL = `mailto:charlotte.pochez@epita.fr?subject=Prise%20de%20contact%20depuis%20projet%20web%20${firstname}%20${name}&body=${encodeURIComponent(message)}`;

        window.location.href = mailtoURL;
    });
});