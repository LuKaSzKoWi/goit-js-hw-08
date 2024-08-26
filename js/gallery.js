const images = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];



const galleryContainer = document.querySelector('.gallery');  // Znalezienie kontenera galerii i podpięcię się pod niego


// Stworzenie elementów galerii dzięki map i join (join łączy elementy tablicy w jeden duży łańcuch HTML bez separatorów)
// kod przekształca tablicę images w znaczniki HTML, tworząc elementy galerii obrazów a
// następnie wszystkie te elementy są łączone w jeden łańcuch HTML i można je dynamicznie umieścić w dokumencie HTML za pomocą np.innerHTML.

const galleryMarkup = images.map(({ preview, original, description }) => {
  return `
    <li class="gallery-item">
      <a class="gallery-link" href="${original}">
        <img
          class="gallery-image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>
  `;
}).join('');


// innerHTML - Przypisanie treści HTML do elementu na stronie internetowej.Dynamicznie dodaje zawartość HTML
// do elementu na stronie co pozwala na dynamiczne tworzenie np.galerii obrazów lub list na podstawie danych.

galleryContainer.innerHTML = galleryMarkup;  



// Blokowanie domyślnego działania linków - event.preventDefault() zapobiega domyślnemu zachowaniu przeglądarki, 
// które w przypadku galerii obrazów opartych na linkach < a > byłoby przejściem na nową stronę.

galleryContainer.addEventListener('click', onGalleryClick);

function onGalleryClick(event) {
  event.preventDefault();

  const isImage = event.target.classList.contains('gallery-image');
  if (!isImage) return;

  const largeImageURL = event.target.dataset.source;

  
  const instance = basicLightbox.create(`
    <img src="${largeImageURL}" width="1112" height="640">
  `);

  instance.show();

  
  window.addEventListener('keydown', (event) => {
    if (event.code === 'Escape') {
      instance.close();
    }
  });
}

// - function onGalleryClick(event)
// Definiujemy funkcję, która będzie wywoływana przy każdym kliknięciu na element galerii.
//     event: Jest to obiekt, który przechowuje informacje o zdarzeniu(w tym przypadku kliknięciu).Dzięki temu możemy dowiedzieć się,
//     na co dokładnie kliknięto, gdzie, itp.
        
// - const isImage = event.target.classList.contains('gallery-image');
// event.target: Zwraca element, na który użytkownik kliknął.
// classList.contains('gallery-image'): Sprawdza, czy element, na który kliknięto, ma klasę gallery-image.
// Wynik tej operacji zostaje zapisany w zmiennej isImage.
// Jeśli kliknięto w obrazek isImage będzie miało wartość true.
// Jeśli kliknięto w coś innego(np.tło) isImage będzie false.

// - if (!isImage) return;
// Jeśli kliknięto na coś co nie jest obrazkiem(np.na kontener lub inny element galerii),
//     funkcja przerywa swoje działanie bo nie chcemy aby cokolwiek się działo jeśli kliknięto w coś innego niż obrazek.

// - const largeImageURL = event.target.dataset.source;
// event.target: To element <img>, na który kliknięto.
// dataset.source: Pobiera wartość z atrybutu data-source z klikniętego obrazka. W naszym przypadku przechowuje on link do dużej wersji obrazu
// largeImageURL: Zmienna, która przechowuje adres URL dużego obrazka(do wyświetlenia w modalnym oknie).

//  - const instance = basicLightbox.create(...)
// basicLightbox.create(...): Funkcja z biblioteki basicLightbox, która tworzy nowe okno modalne.
// W tym przypadku tworzymy instancję okna modalnego, która zawiera tag <img> z dużym obrazkiem. Źródło obrazu to wartość z largeImageURL.
// width="800" height="600": Określamy rozmiary wyświetlanego obrazka.

// - instance.show();
// Ta linia otwiera okno modalne z dużym obrazkiem, które zostało utworzone za pomocą basicLightbox.create.

// - window.addEventListener('keydown', (event) => {...}
// Ta część kodu nasłuchuje na zdarzenie naciśnięcia klawisza na klawiaturze.
// Funkcja dodaje nasłuchiwanie zdarzenia keydown, czyli momentu, gdy użytkownik naciska jakikolwiek klawisz na klawiaturze.

// - if (event.code === 'Escape') {... }
// event.code: To kod klawisza, który został naciśnięty.
// Sprawdzamy, czy naciśnięto klawisz Escape. Jeśli tak, to wykonujemy blok kodu wewnątrz tego warunku.

// - instance.close();
// Jeśli naciśnięto klawisz Escape, zamykamy okno modalne. Funkcja close() z biblioteki basicLightbox służy do zamknięcia okna modalnego.

// PODSUMOWUJĄC:
// 1. Po kliknięciu na miniaturę obrazka sprawdzamy, czy kliknięto na właściwy element (czyli obrazek z klasy gallery-image).
// 2. Jeśli tak, pobieramy adres URL dużego obrazka i tworzymy okno modalne za pomocą biblioteki basicLightbox.
// 3. Wyświetlamy to okno modalne z dużym obrazkiem.
// 4. Dodajemy funkcję nasłuchującą na naciśnięcie klawisza Escape, która zamknie okno modalne, gdy klawisz zostanie wciśnięty.
