
(function () {
  // simple debounce
  function debounce(fn, wait = 120) {
    let t;
    return function (...args) {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  }

  document.addEventListener('DOMContentLoaded', function () {
    const search = document.getElementById('search');
    const container = document.getElementById('cont');
    const cards = Array.from(document.querySelectorAll('.flexbox'));

    if (!search) {
      console.error('Search input #search not found.');
      return;
    }

    // Add inline CSS styles for animation
    const style = document.createElement('style');
    style.textContent = `
      .flexbox {
        transition: opacity 0.25s ease, transform 0.25s ease;
        opacity: 1;
        transform: translateY(0);
      }
      .flexbox.hide {
        opacity: 0;
        transform: translateY(10px);
        pointer-events: none;
      }
      #noResultsMessage {
        transition: opacity 0.25s ease, transform 0.25s ease;
        opacity: 1;
        transform: translateY(0);
        text-align: center;
        color: #888;
        margin: 16px 0;
      }
      #noResultsMessage.hide {
        opacity: 0;
        transform: translateY(10px);
        pointer-events: none;
      }
    `;
    document.head.appendChild(style);

    // Save each card's original display
    cards.forEach(card => {
      const cs = window.getComputedStyle(card);
      card.dataset.origDisplay =
        cs.display && cs.display !== 'none' ? cs.display : 'flex';
    });

    const NO_ID = 'noResultsMessage';
    function setNoResults(show) {
      let msg = document.getElementById(NO_ID);

      if (show) {
        if (!msg) {
          msg = document.createElement('p');
          msg.id = NO_ID;
          msg.textContent = 'No universities found';
          container.appendChild(msg);
          msg.offsetHeight; // force reflow for transition
        }
        msg.classList.remove('hide');
      } else if (msg) {
        msg.classList.add('hide');
        msg.addEventListener('transitionend', function handler() {
          if (msg.classList.contains('hide')) msg.remove();
          msg.removeEventListener('transitionend', handler);
        });
      }
    }

    function filterCards() {
      const q = search.value.trim().toLowerCase();
      let found = 0;

      cards.forEach(card => {
        const name =
          card.querySelector('.flexp')?.textContent.toLowerCase() || '';
        const desc =
          card.querySelector('.flexpid')?.textContent.toLowerCase() || '';
        const text = name + ' ' + desc;

        if (q === '' || text.includes(q)) {
          card.classList.remove('hide');
          card.style.display = card.dataset.origDisplay;
          found++;
        } else {
          card.classList.add('hide');
          card.addEventListener('transitionend', function handler() {
            if (card.classList.contains('hide')) {
              card.style.display = 'none';
            }
            card.removeEventListener('transitionend', handler);
          });
        }
      });

      setNoResults(found === 0);
    }

    search.addEventListener('input', debounce(filterCards, 80));
    filterCards(); // initial run
  });
})();



function up() {
    header = document.getElementById("header")
    container = document.getElementById("container")
    nav = document.getElementById('navig')
    header.style.top = "0px"
    container.style.paddingTop = "120px"
    navig.style.transform = "rotateX(0deg)"
    x = 1
}

function down() {
    header = document.getElementById("header")
    container = document.getElementById("container")
    nav = document.getElementById('navig')
    header.style.top = "-100px"
    container.style.paddingTop = "70px"
    navig.style.transform = "rotateX(180deg)"
    x = 0
}

var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    
    up()
    
  } else {
    down()
      }
  prevScrollpos = currentScrollPos;
}
x = 1
function nn() {
    if (x == 1) {
        down()
        x = 0
    }
    else if (x == 0) {
        up()
        x = 1
    }
}
g = 1


function darke() {
  
  dark = document.getElementById('dark')
  if (g == 1) {
    dark.style.display = 'block'
   setTimeout(() => {
  dark.style.background = 'rgba(0,0,0,0.5)';
  dark.style.backdropFilter = 'blur(20px)';
  g = 0;
}, 10);
  }
  else if (g == 0) {
    dark.style.background = 'rgb(0,0,0,0)'
    dark.style.backdropFilter = 'blur(0px)'
    g = 1
    setTimeout(() => dark.style.display = 'none' , 300)
  }
}

function menue() {
  
  menu = document.getElementById('menu')
  if (g == 1) {
    menu.style.display = 'block'
   setTimeout(() => {
  menu.style.left = '0';
  g = 0;
}, 10);
  }
  else if (g == 0) {
    menu.style.left = '100%'
    g = 1
    setTimeout(() => menu.style.display = 'none' , 300)
  }
}