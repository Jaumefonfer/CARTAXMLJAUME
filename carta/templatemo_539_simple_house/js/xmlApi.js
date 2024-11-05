document.addEventListener("DOMContentLoaded", () => {
    const xmlUrl = 'https://raw.githubusercontent.com/Jaumefonfer/CAARTAXML/main/carta.xml';

    fetch(xmlUrl)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "text/xml");

            // Obtener el contenedor del menú en HTML
            const menuContainer = document.getElementById("menu");

            // Iterar por cada <grup> en el XML
            const grups = xmlDoc.getElementsByTagName("grup");
            Array.from(grups).forEach(grup => {
                // Obtener el nombre del grupo
                const grupNom = grup.getElementsByTagName("nom")[0].textContent;

                // Crear un contenedor para el grupo
                const grupDiv = document.createElement("div");
                grupDiv.classList.add("GRUP");

                // Título del grupo (usamos un <h2> para el nombre del grupo)
                const grupTitle = document.createElement("h2");
                grupTitle.textContent = grupNom;
                grupDiv.appendChild(grupTitle);

                // Iterar por cada <plat> dentro del grupo
                const plats = grup.getElementsByTagName("plat");
                Array.from(plats).forEach(plat => {
                    const platNom = plat.getElementsByTagName("nom")[0].textContent;
                    const platDesc = plat.getElementsByTagName("descripcio")[0].textContent;
                    const platPreu = plat.getElementsByTagName("preu")[0].textContent;
                    const platImageLink = plat.getElementsByTagName("imagelink")[0].textContent;

                    // Crear un bloque de artículo para el plato
                    const platDiv = document.createElement("article");
                    platDiv.classList.add("col-lg-3", "col-md-4", "col-sm-6", "col-12", "tm-gallery-item", "PLAT");
                    
                    const platFigure = document.createElement("figure");

                    // Añadir imagen del plato
                    const img = document.createElement("img");
                    img.src = platImageLink; // Usar el enlace de la imagen del XML
                    img.alt = platNom;
                    img.classList.add("img-fluid", "tm-gallery-img");

                    platFigure.appendChild(img);

                    const figcaption = document.createElement("figcaption");
                    
                    // Nombre del plato
                    const platTitle = document.createElement("h4");
                    platTitle.classList.add("tm-gallery-title");
                    platTitle.textContent = platNom;

                    // Descripción del plato
                    const platDescription = document.createElement("p");
                    platDescription.classList.add("tm-gallery-description");
                    platDescription.textContent = platDesc;

                    // Precio del plato
                    const platPrice = document.createElement("p");
                    platPrice.classList.add("tm-gallery-price");
                    platPrice.textContent = `Preu: ${platPreu}`;

                    // Añadir elementos al figcaption
                    figcaption.appendChild(platTitle);
                    figcaption.appendChild(platDescription);
                    figcaption.appendChild(platPrice);

                    platFigure.appendChild(figcaption);
                    platDiv.appendChild(platFigure);
                    grupDiv.appendChild(platDiv);
                });

                // Añadir el grupo al contenedor del menú
                menuContainer.appendChild(grupDiv);
            });
        })
        .catch(error => console.error("Error al cargar el XML:", error));
});
